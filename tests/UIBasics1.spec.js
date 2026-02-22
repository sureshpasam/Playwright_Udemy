const {test, expect} = require('@playwright/test');
const { promises } = require('node:dns');
test.describe.configure({mode:'parallel'})
//test.describe.configure({mode:'serial'})
test('UIBasics', async({page}) => {
    //PLay wright code wright here
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
//css
await page.locator("input[name='username']").fill("rahulshettyacademy");
await page.locator("input[name='password']").fill("learning");
await page.locator("#signInBtn").click();
console.log( "Displaying error message on this console: " + await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toHaveText("Old password \"learning\" is no longer valid. Please use the new password \"Learning@830$3mK2\".");
await expect(page.locator("[style*='block']")).toContainText("Old password \"learning\" is no longer valid. Please use the new password \"Learning@830$3mK2\".");   
});

test('login', async({page}) => {

const UserName = page.locator("input[name='username']");
const Password = page.locator("input[name='password']");
const SignInBtn = page.locator("#signInBtn");
const CardTitles = page.locator(".card-body a");

    //PLay wright code wright here
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
//css
await UserName.fill("Suresh");
await Password.fill("Suresh@143");
await SignInBtn.click();
console.log( "Displaying error message on this console: " + await page.locator("[style*='block']").textContent());
//await expect(page.locator("[style*='block']")).toHaveText("Old password \"learning\" is no longer valid. Please use the new password \"Learning@830$3mK2\".");
//await expect(page.locator("[style*='block']")).toContainText("Old password \"learning\" is no longer valid. Please use the new password \"Learning@830$3mK2\".");   

/* One class having multiple elements, we can use nth() method to get the specific element from that class. */
//console.log(await page.locator(".card-body a").first().textContent());
//console.log(await page.locator("p.text-center").nth(1).textContent());

await expect(CardTitles).toHaveCount(4);
await expect(CardTitles).toHaveText(["ProtoCommerce","ProtoCommerce Shop","ProtoCommerce Academy","ProtoCommerce Sandbox"]);
await expect(CardTitles).toHaveText(/ProtoCommerce/);
await expect(CardTitles).toHaveText(/Shop/);
console.log(await CardTitles.allTextContents()); // this will give us the array of all the text contents of that class- if the page not loading properly then it will give us empty array.

await CardTitles.nth(0).click();
await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop");
await CardTitles.allTextContents().then(values => console.log(values));


});


test('login1', async({page}) => {

const Email = page.locator("input[id='userEmail']");
const Password = page.locator("input[id='userPassword']");
const SignInBtn = page.locator("#login");
const CardTitles = page.locator(".card-body a");
await page.goto('https://rahulshettyacademy.com/client/');
await Email.fill("sureshpasam94@gmail.com");
await Password.fill("Chaitu@143");
await SignInBtn.click();
console.log( "Land on the page" + await page.locator("div[class='left mt-1'] p").textContent());
await expect(page.locator("div[class='left mt-1'] p")).toHaveText("Automation Practice");
await expect(page.locator("div[class='left mt-1'] p")).toContainText("Automation Practice");
//await expect(page.locator(".card-body b")).first().toHaveText("ADIDAS ORIGINAL");
//await expect(page.locator(".card-body b")).nth(0).toContainText("ADIDAS ORIGINAL");
console.log(await page.locator(".card-body b").first().textContent());
console.log(await page.locator(".card-body b").nth(0).textContent());
await page.waitForLoadState('networkidle'); // this will wait for the network to be idle before executing the next line of code, it will wait for all the network requests to be completed before executing the next line of code. This is useful when we are waiting for the page to load completely before executing the next line of code.
await page.networkidle(); // this will wait for the network to be idle before executing the next line of code, it will wait for all the network requests to be completed before executing the next line of code. This is useful when we are waiting for the page to load completely before executing the next line of code.
await page.locator(".card-body b").waitFor(); // only one this will wait for the element to be visible on the page before executing the next line of code, this is useful when we are waiting for the element to be visible on the page before executing the next line of code.
await page.locator(".card-body b").first().waitFor(); // this will wait for the first element of the class to be visible on the page before executing the next line of code, this is useful when we are waiting for the first element of the class to be visible on the page before executing the next line of code.
console.log((await page.locator(".card-body b").allTextContents())); 

});

test('dropdowns_NewPageOr window', async({page,browser}) => {
   const context = await browser.newContext();
   const newpage1= await context.newPage();
    await newpage1.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const dropdown = await newpage1.locator("select.form-control").selectOption("consult");
    await expect(newpage1.locator("select.form-control")).toHaveValue("consult");
   //console.log(dropdown.then(values => console.log(values)));
   //dropdown.allTextContents().then(values => console.log(values));

   const documentLink = await newpage1.locator("[href*='documents-request']");
   const [NaviGateTab] =await Promise.all([
    context.waitForEvent('page'),
   //context.waitForEvent('newpage1'), // this will wait for the new page to be opened after clicking the link, this is useful when we are waiting for the new page to be opened after clicking the link.
   documentLink.click()// this will open the link in a new tab, we need to switch to that new tab to perform any action on that page.
   ]);
const text = await NaviGateTab.locator(".red").textContent();
console.log("Text message is:: " + text);
const arrayText = text.split("@");
const domain = arrayText[1].split(" ")[0];
console.log("Domain: " + domain);
await newpage1.locator("#username").inputValue(domain);
await newpage1.locator("#username").fill(domain);

 // what is the difference between inputValue() and textContent()?
 // inputValue(): returns the form control's current .value (input, textarea, select). Use to read what the user typed or what .fill() set.
 // textContent(): returns the element's .textContent for any DOM element (includes hidden text, not normalized). Use innerText() for visible/normalized text.
await newpage1.locator("#password").inputValue("learning");
await newpage1.locator("#password").fill("learning");

await newpage1.locator("#signInBtn").click();
console.log( "Displaying error message on this console: " + await newpage1.locator("[style*='block']").textContent());
await expect(newpage1.locator("[style*='block']")).toHaveText("Old password \"learning\" is no longer valid. Please use the new password \"Learning@830$3mK2\".");
await expect(newpage1.locator("[style*='block']")).toContainText("Old password \"learning\" is no longer valid. Please use the new password \"Learning@830$3mK2\".");   

await newpage1.close();
await context.close();
});