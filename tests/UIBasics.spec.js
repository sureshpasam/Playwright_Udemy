const {test, expect} = require('@playwright/test');
/*test('UIBasics', async({browser}) => {
    //PLay wright code wright here
    const br = browser.newContext();
   const page = await br.newPage();
   await page.goto('https://www.google.com/');
 
});
*/

test('UIBasics', async({page}) => {
    //PLay wright code wright here
   await page.goto('https://www.google.com/');
   await expect(page).toHaveTitle("Google");
   console.log(await page.title());
 
});

