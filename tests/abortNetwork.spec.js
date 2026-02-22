const { test, expect } = require('@playwright/test');

test('abort a matched request with route.abort()', async ({ page }) => {
  await page.route('**/api/data', route => route.abort());

  await page.setContent(`
    <button id="btn">Fetch</button>
    <div id="output">idle</div>
    <script>
      document.getElementById('btn').addEventListener('click', () => {
        fetch('/api/data')
          .then(r => r.text())
          .then(t => document.getElementById('output').textContent = t)
          .catch(() => document.getElementById('output').textContent = 'NETWORK_ERROR');
      });
    </script>
  `);

  await page.click('#btn');
  await expect(page.locator('#output')).toHaveText('NETWORK_ERROR');
});

test('conditionally abort requests by URL and continue others', async ({ page }) => {
  await page.route('**/*', route => {
    const url = route.request().url();
    if (url.includes('/analytics')) {
      route.abort();
    } else if (url.includes('/api/data')) {
      route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'OK'
      });
    } else {
      route.continue();
    }
  });

  await page.setContent(`
    <div id="a">idle</div>
    <script>
      // analytics should fail, api should succeed
      fetch('/analytics').catch(()=>document.getElementById('a').textContent='ANALYTICS_FAILED');
      fetch('/api/data').then(()=>document.getElementById('a').textContent='API_OK').catch(()=>document.getElementById('a').textContent='API_FAIL');
    </script>
  `);

  await expect(page.locator('#a')).toHaveText('API_OK');
});

test('abort with a specific reason code', async ({ page }) => {
  await page.route('**/files/*', route => route.abort('connectionrefused'));

  await page.setContent(`
    <div id="out">idle</div>
    <script>
      fetch('/files/1').then(r=>r.text()).then(t=>document.getElementById('out').textContent=t).catch(()=>document.getElementById('out').textContent='FILE_ERR');
    </script>
  `);

  await expect(page.locator('#out')).toHaveText('FILE_ERR');
});
