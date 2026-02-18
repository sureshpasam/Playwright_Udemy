const {test, expect} = require("@playwright/test");
test('Section9', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
   /* await page.goto('https://www.google.com/');
      await page.goBack();
      await page.goForward();
    */
   await page.locator("#displayed-text").isVisible();
   await page.locator("#hide-textbox").click();
   await expect(page.locator("#displayed-text")).toBeHidden();
   // Handling Alert and Confirm popups
   page.on("dialog", dialog => dialog.accept());
   await page.locator("#confirmbtn").click();
   await page.locator("#confirmbtn").click();
   page.on("dialog", dialog => dialog.dismiss());
   // Mouse hover
   await page.locator("#mousehover").click();
   console.log(await page.locator(".mouse-hover-content a").allTextContents());
   (await page.locator(".mouse-hover-content a").allTextContents()).forEach(element => {
    console.log(element);
   });

   // Handling the frames
   const frame = page.frameLocator("#courses-iframe");
   await frame.locator("li a[href*='lifetime-access']:visible").click();
    const textContent = await frame.locator(".text h2").textContent();
    console.log(textContent.split(" ")[1]);
    await page.pause();
});