import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { z } from 'zod';

import { careerSchema, organizationSchema, scholarshipSchema } from '../../src/schema';
import { supported, type Quoted } from './evidence';
import {
  extractCareer,
  extractCareerUrls,
  extractOrganization,
  extractScholarships,
  usage,
} from './extract';
import { fetchPage, openBrowser, type FetchedPage } from './fetch';
import { geocode } from './geocode';

const DATA = 'data';
const today = new Date().toISOString().slice(0, 10);

const sourceSchema = z.object({ id: z.string(), contact_url: z.string() });
const sourcesSchema = z.object({
  universities: z.array(sourceSchema.extend({ careers_url: z.string() })),
  entities: z.array(sourceSchema.extend({ scholarship_urls: z.array(z.string()) })),
});
const stateSchema = z.record(z.string(), z.object({ hash: z.string(), checked: z.string() }));

const slug = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const hash = (page: FetchedPage) =>
  createHash('sha256')
    .update(page.pdf ?? page.text)
    .digest('hex');

const readJson = <T>(file: string, schema: z.ZodType<T>) =>
  existsSync(file) ? schema.parse(JSON.parse(readFileSync(file, 'utf8'))) : null;

const readRecords = <T>(dir: string, schema: z.ZodType<T>) =>
  existsSync(dir)
    ? readdirSync(dir).map((name) => {
        const file = path.join(dir, name);
        return { file, record: schema.parse(JSON.parse(readFileSync(file, 'utf8'))) };
      })
    : [];

const writeJson = (file: string, value: unknown) => {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
};

const snapshot = () =>
  new Map(
    readdirSync(DATA, { recursive: true, encoding: 'utf8' })
      .filter((name) => name.endsWith('.json') && name !== 'state.json')
      .map((name) => [name, readFileSync(path.join(DATA, name), 'utf8')]),
  );

const CRITICAL = [
  'application_start_date',
  'application_final_date',
  'studies_start_date',
  'studies_final_date',
  'costs',
  'duration',
];

const changedFields = (before: string, after: string) => {
  const fields = z.record(z.string(), z.unknown());
  const old = fields.parse(JSON.parse(before));
  const now = fields.parse(JSON.parse(after));
  return Object.keys(now).filter((key) => JSON.stringify(old[key]) !== JSON.stringify(now[key]));
};

const section = (title: string, lines: string[]) =>
  lines.length ? [`### ${title}`, ...lines.map((line) => `- ${line}`), ''] : [];

const summarize = (
  before: Map<string, string>,
  after: Map<string, string>,
  failures: string[],
  notes: string[],
) => {
  const changed = Array.from(after).flatMap(([file, content]) => {
    const previous = before.get(file);
    if (previous === undefined || previous === content) return [];
    const fields = changedFields(previous, content);
    return [
      {
        line: `${file}: ${fields.join(', ')}`,
        critical: fields.some((field) => CRITICAL.includes(field)),
      },
    ];
  });
  return [
    `## Data update ${today}`,
    '',
    ...section(
      'Changed dates, costs or duration',
      changed.filter((item) => item.critical).map((item) => item.line),
    ),
    ...section(
      'New',
      Array.from(after.keys()).filter((file) => !before.has(file)),
    ),
    ...section(
      'Other changes',
      changed.filter((item) => !item.critical).map((item) => item.line),
    ),
    ...section(
      'Removed',
      Array.from(before.keys()).filter((file) => !after.has(file)),
    ),
    ...section('Sources that failed', failures),
    ...section('Needs a human check', notes),
    `Model ${usage.model}: ${usage.inputTokens} input tokens, ${usage.outputTokens} output tokens.`,
    '',
  ].join('\n');
};

const main = async () => {
  const sources = sourcesSchema.parse(parse(readFileSync(`${DATA}/sources.yaml`, 'utf8')));
  const state = readJson(`${DATA}/state.json`, stateSchema) ?? {};
  const before = snapshot();
  const failures: string[] = [];
  const notes: string[] = [];
  const { context, close } = await openBrowser();

  const attempt = async (label: string, work: () => Promise<void>) => {
    try {
      await work();
      return true;
    } catch (error) {
      failures.push(`${label}: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  };

  const unchanged = (url: string, digest: string) => {
    if (state[url]?.hash !== digest) return false;
    state[url].checked = today;
    return true;
  };

  const verify = (page: FetchedPage, label: string, quoted: Quoted) => {
    if (page.pdf && !page.text.trim()) {
      if (quoted.value) notes.push(`Check by hand, scanned PDF: ${label} = ${quoted.value}`);
      return quoted;
    }
    const checked = supported(quoted, page.text);
    if (checked.value !== quoted.value) {
      notes.push(`Dropped, not found in the page: ${label} = ${quoted.value}`);
    }
    return checked;
  };

  const verifyDate = (page: FetchedPage, label: string, quoted: Quoted) => {
    const checked = verify(page, label, quoted);
    if (checked.value === null || /^\d{4}-\d{2}-\d{2}$/.test(checked.value)) return checked;
    notes.push(`Dropped, not a full date: ${label} = ${checked.value}`);
    return { value: null, evidence: '' };
  };

  const updateOrganization = async (
    kind: 'universities' | 'entities',
    source: z.infer<typeof sourceSchema>,
  ) => {
    const file = `${DATA}/${kind}/${source.id}.json`;
    const existing = readJson(file, organizationSchema);
    const page = await fetchPage(context, source.contact_url);
    const digest = hash(page);
    if (existing && unchanged(page.url, digest)) return;
    const extracted = await extractOrganization(page);
    const addresses = [];
    for (const address of extracted.addresses) {
      const known = existing?.addresses.find((item) => item.address === address);
      const located = known ?? (await geocode(address));
      if (!known && located.lat !== null) {
        notes.push(
          `New map pin, ${source.id}: ${address} → https://www.google.com/maps?q=${located.lat},${located.lng}`,
        );
      }
      addresses.push(located);
    }
    writeJson(
      file,
      organizationSchema.parse({
        ...extracted,
        id: source.id,
        logo: existing?.logo ?? null,
        addresses,
        source_urls: [source.contact_url],
      }),
    );
    state[page.url] = { hash: digest, checked: today };
  };

  const updateCareers = async (
    university: z.infer<typeof sourcesSchema>['universities'][number],
  ) => {
    const dir = `${DATA}/careers/${university.id}`;
    const existing = readRecords(dir, careerSchema);
    const index = await fetchPage(context, university.careers_url);
    const indexDigest = hash(index);
    const urls =
      existing.length && unchanged(index.url, indexDigest)
        ? existing.map(({ record }) => record.source_urls[0])
        : await extractCareerUrls(index);

    const written = new Set<string>();
    let complete = true;
    for (const url of urls) {
      const done = await attempt(url, async () => {
        const page = await fetchPage(context, url);
        const digest = hash(page);
        const current = existing.find(({ record }) => record.source_urls[0] === url);
        if (current && unchanged(url, digest)) return;
        const extracted = await extractCareer(page);
        const record = careerSchema.parse({
          ...extracted,
          duration: verify(page, `${extracted.name} duration`, extracted.duration),
          costs: verify(page, `${extracted.name} costs`, extracted.costs),
          id: slug(extracted.name),
          university: university.id,
          source_urls: [url],
        });
        const file = `${dir}/${record.id}.json`;
        const other = existing.find((item) => item.file === file)?.record.source_urls[0];
        if (written.has(file) || (other && other !== url)) {
          throw new Error(`two pages produce the career id ${record.id}`);
        }
        if (current && current.file !== file) rmSync(current.file);
        writeJson(file, record);
        written.add(file);
        state[url] = { hash: digest, checked: today };
      });
      complete = complete && done;
    }

    existing
      .filter(({ record }) => !urls.includes(record.source_urls[0]))
      .forEach(({ file }) => rmSync(file));
    // The index is read again next run if any of its careers failed.
    if (complete) state[index.url] = { hash: indexDigest, checked: today };
  };

  const updateScholarships = async (entity: z.infer<typeof sourcesSchema>['entities'][number]) => {
    const dir = `${DATA}/scholarships/${entity.id}`;
    const existing = readRecords(dir, scholarshipSchema);
    for (const url of entity.scholarship_urls) {
      await attempt(url, async () => {
        const page = await fetchPage(context, url);
        const digest = hash(page);
        if (unchanged(url, digest)) return;
        const written = new Set<string>();
        for (const extracted of await extractScholarships(page)) {
          const date = (field: string, quoted: Quoted) =>
            verifyDate(page, `${extracted.name} ${field}`, quoted);
          const record = scholarshipSchema.parse({
            ...extracted,
            application_start_date: date('application start', extracted.application_start_date),
            application_final_date: date('application deadline', extracted.application_final_date),
            studies_start_date: date('studies start', extracted.studies_start_date),
            studies_final_date: date('studies end', extracted.studies_final_date),
            id: slug(extracted.name),
            entity: entity.id,
            source_urls: [url],
          });
          const file = `${dir}/${record.id}.json`;
          const other = existing.find((item) => item.file === file)?.record.source_urls[0];
          if (written.has(file) || (other && other !== url)) {
            throw new Error(`two scholarships produce the id ${record.id}`);
          }
          writeJson(file, record);
          written.add(file);
        }
        existing
          .filter(({ file, record }) => record.source_urls[0] === url && !written.has(file))
          .forEach(({ file }) => rmSync(file));
        state[url] = { hash: digest, checked: today };
      });
    }
    existing
      .filter(({ record }) => !entity.scholarship_urls.includes(record.source_urls[0]))
      .forEach(({ file, record }) => {
        rmSync(file);
        delete state[record.source_urls[0]];
      });
  };

  for (const university of sources.universities) {
    await attempt(university.contact_url, () => updateOrganization('universities', university));
    await attempt(university.careers_url, () => updateCareers(university));
  }
  for (const entity of sources.entities) {
    await attempt(entity.contact_url, () => updateOrganization('entities', entity));
    await updateScholarships(entity);
  }

  await close();
  writeJson(`${DATA}/state.json`, state);
  writeFileSync('pipeline-summary.md', summarize(before, snapshot(), failures, notes));
};

main();
