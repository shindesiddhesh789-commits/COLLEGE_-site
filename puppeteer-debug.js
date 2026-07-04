import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request =>
    console.log('REQUEST FAILED:', request.url(), request.failure().errorText)
  );

  console.log('Navigating to http://localhost:3001');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });

  console.log('Navigation complete. Evaluating body...');
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  console.log('Body length:', bodyHTML.length);
  if (bodyHTML.length < 500) {
      console.log('Body HTML:', bodyHTML);
  }

  await browser.close();
})();
