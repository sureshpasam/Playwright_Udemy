const { test, expect } = require('@playwright/test');

test('mocks API response and displays result', async ({ page }) => {
  // Intercept the network request and return a mocked JSON response
  await page.route('**/todos/1', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ id: 1, title: 'mocked todo', completed: false }),
    });
  });

  // Load a tiny page that fetches the API and writes the result to the DOM
  await page.setContent(`
    <html>
      <body>
        <div id="output">loading</div>
        <script>
          fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(r => r.json())
            .then(json => {
              document.getElementById('output').textContent = json.title;
            })
            .catch(err => { document.getElementById('output').textContent = 'error'; });
        </script>
      </body>
    </html>
  `);

  // Assert the mocked value is rendered
  await expect(page.locator('#output')).toHaveText('mocked todo');
});
