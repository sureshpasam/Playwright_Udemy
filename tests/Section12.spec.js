const {test, expect,request} = require("@playwright/test");
let webContext;
test('Screenshot and Visual Testing',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'singleElement.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png',fullPage:true});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test.only('Visual Testing with Playwright',async ({page})=>
{
    await page.goto("https://rediff.com/");  
    expect(await page.screenshot()).toMatchSnapshot('rediff.png');

});
