type Quoted = { value: string | null; evidence: string };

const normalize = (text: string) => text.replace(/\s+/g, ' ').trim().toLowerCase();

// A value stays only if the text it claims to come from is in the page.
export const supported = (quoted: Quoted, pageText: string): Quoted => {
  if (quoted.value === null) return quoted;
  const evidence = normalize(quoted.evidence);
  if (evidence && normalize(pageText).includes(evidence)) return quoted;
  return { value: null, evidence: '' };
};
