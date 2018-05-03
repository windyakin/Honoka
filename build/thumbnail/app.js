const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 420, deviceScaleFactor: 1.5 });
  await page.goto(`file://${__dirname}/thumbnail.html`);
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  console.log('Finish');
  await page.close();
  await browser.close();
})();
