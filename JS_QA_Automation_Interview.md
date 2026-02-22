# JavaScript Interview Questions & Answers — QA Automation Engineer

This file contains focused JavaScript interview Q&A for QA automation roles, with short code examples and real-world scenarios.

## Core JavaScript
- **Closure:** A function plus its lexical environment. Useful for encapsulating helper state in tests.
- **Hoisting:** `var` declarations are hoisted; `let`/`const` are not initialized. Affects test setup ordering.
- **`this`:** Dynamic in regular functions (call-site), lexical in arrow functions. Use function declarations when frameworks rely on `this` (e.g., Mocha hooks).
- **Prototype vs class:** `class` is syntactic sugar over prototypes. Use prototypes for lightweight helpers or utilities.
- **`==` vs `===`:** `===` is strict — prefer for assertions.

## Async / Promises / Event Loop
- **Promises vs callbacks:** Promises compose better; use `async/await` for readability.
- **Concurrently wait:** `Promise.all`, `Promise.allSettled`, `Promise.race`.
- **Microtask vs macrotask:** `Promise` callbacks (microtasks) run before timers — impacts assertion timing.

Example:

```js
test('async example', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toContain('Example');
});
```

## DOM & Selectors (QA-specific)
- Prefer `data-*` attributes (e.g., `data-testid`) or ARIA roles; avoid fragile CSS selectors.
- Use explicit waits (`locator().waitFor()`, `toHaveText()`), avoid fixed sleeps.

Example:

```js
await page.locator('[data-testid="login-button"]').click();
await expect(page.locator('[role="alert"]')).toHaveText('Logged in');
```

## Testing Frameworks & Tools
- Use built-in `expect` with Playwright; `chai` is common in Mocha stacks.
- Use fixtures for isolation and `storageState` for auth.

## API Testing & Mocking
- Mock requests with `page.route()` and `route.fulfill()` to stabilize CI.
- Inspect requests to validate payloads using `request.postData()`.

Example — validate request body:

```js
let intercepted;
await page.route('**/api/login', route => { intercepted = route.request(); route.continue(); });
// trigger action
expect(await intercepted.postData()).toContain('username');
```

## Automation Patterns & Real-World Scenarios
- **Auth handling:** Save `storageState` after login and reuse in tests to skip UI login.
- **Data seeding/cleanup:** Use API calls in `beforeEach`/`afterEach` to ensure deterministic state.
- **Parallel tests:** Use unique data (timestamps/UUIDs) to avoid collisions.
- **Retry vs fix:** Use retries for transient network flakiness, but fix root causes when possible.

## Useful Code Snippets
- Debounce:

```js
function debounce(fn, wait){
  let t;
  return (...args)=>{ clearTimeout(t); t = setTimeout(()=>fn(...args), wait); };
}
```

- Retry async operation:

```js
async function retry(fn, attempts=3, delay=500){
  for(let i=0;i<attempts;i++){
    try { return await fn(); }
    catch(e){ if(i===attempts-1) throw e; await new Promise(r=>setTimeout(r, delay)); }
  }
}
```

- Deep clone (simple):

```js
function deepClone(obj){ return JSON.parse(JSON.stringify(obj)); }
```

## Interview Scenarios
- **Flaky login:** Capture network trace, mock backend response to reproduce, assert UI state transitions (not timing).
- **Third-party payment intermittent failures:** Mock responses in CI; run periodic integration tests against the real gateway in staging.
- **Pagination with large datasets:** Seed DB, test boundaries (empty/partial last page), assert response time thresholds.

## Behavioral / Process Questions
- **Prioritize tests:** Focus on critical flows (login, checkout), high-risk features, recent bugs.
- **Measure effectiveness:** Flakiness rate, runtime, coverage of critical flows, defect detection rate.
- **When to mock vs real services:** Mock for deterministic CI; use real services for scheduled integration tests.

---

If you want this exported as a PDF, a set of flashcards, or broken into separate markdown files per topic, tell me which format.
