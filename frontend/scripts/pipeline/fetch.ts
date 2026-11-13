import { chromium, type BrowserContext } from 'playwright';
import { extractText, getDocumentProxy } from 'unpdf';

export type FetchedPage = {
  url: string;
  text: string;
  links: { text: string; url: string }[];
  // Base64 file when the source is a PDF. Its text is empty for a scanned document.
  pdf: string | null;
};

const RENDER_MS = 3000;
const PAUSE_MS = 2000;

export const openBrowser = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ locale: 'es-SV' });
  return { context, close: () => browser.close() };
};

const pause = () =>
  new Promise((resolve) => {
    setTimeout(resolve, PAUSE_MS);
  });

const fetchPdf = async (context: BrowserContext, url: string): Promise<FetchedPage> => {
  const response = await context.request.get(url, { timeout: 60_000 });
  if (!response.ok()) throw new Error(`${url} responded ${response.status()}`);
  const body = await response.body();
  const { text } = await extractText(await getDocumentProxy(new Uint8Array(body)), {
    mergePages: true,
  });
  await pause();
  return { url, text, links: [], pdf: body.toString('base64') };
};

export const fetchPage = async (context: BrowserContext, url: string): Promise<FetchedPage> => {
  if (new URL(url).pathname.toLowerCase().endsWith('.pdf')) return fetchPdf(context, url);
  const page = await context.newPage();
  try {
    const response = await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
    if (!response?.ok()) throw new Error(`${url} responded ${response?.status()}`);
    await page.waitForTimeout(RENDER_MS);
    const text = await page.innerText('body');
    const links = await page.evaluate(() =>
      Array.from(document.links, (link) => ({ text: link.innerText.trim(), url: link.href })),
    );
    return { url, text, links, pdf: null };
  } finally {
    await page.close();
    await pause();
  }
};
