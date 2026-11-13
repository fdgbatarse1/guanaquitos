import { chromium, type BrowserContext } from 'playwright';

export type FetchedPage = {
  url: string;
  text: string;
  links: { text: string; url: string }[];
};

const RENDER_MS = 3000;
const PAUSE_MS = 2000;

export const openBrowser = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ locale: 'es-SV' });
  return { context, close: () => browser.close() };
};

export const fetchPage = async (context: BrowserContext, url: string): Promise<FetchedPage> => {
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
    await page.waitForTimeout(RENDER_MS);
    const text = await page.innerText('body');
    const links = await page.evaluate(() =>
      Array.from(document.links, (link) => ({ text: link.innerText.trim(), url: link.href })),
    );
    return { url, text, links };
  } finally {
    await page.close();
    await new Promise((resolve) => {
      setTimeout(resolve, PAUSE_MS);
    });
  }
};
