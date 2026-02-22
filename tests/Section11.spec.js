// Login UI
// test, Create cart,order,order details and history API
const {test, expect,request} = require("@playwright/test");
let webContext;
test.beforeAll('login',async ({browser})=>
{
    const Context = await browser.newContext();
    const page = await Context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("input[id='userEmail']").fill("sureshpasam94@gmail.com");
    await page.locator("input[id='userPassword']").fill("Chaitu@143");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await Context.storageState({path:'state.json'}); // this will save the storage state in a file called state.json, we can use this file to authenticate the API requests in our tests. This way we don't have to write the code to get the access token in each test and we can reuse the same access token for all the tests.
    webContext = await browser.newContext({storageState:'state.json'}); // this will create a new context with the storage state from the file state.json, we can use this context to authenticate the API requests in our tests. This way we don't have to write the code to get the access token in each test and we can reuse the same access token for all the tests.
     console.log("Login successful");

})

test('Place the order', async ()=>
{
    const productName = "ZARA COAT 3";
       const page = await webContext.newPage();
         await page.goto('https://rahulshettyacademy.com/client/');
    const allProducts = page.locator(".card-body");
    const count = await allProducts.count();
 
    const titles  = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    page.on('request', request => {
        console.log("Request URL:: "+request.url());

    });
        page.on('response', response => {
        console.log("Response URL:: "+response.url());
        
    });
  for(let i=0; i<count; i++){ 
    if(await allProducts.nth(i).locator("b").textContent() === productName){
        console.log(await allProducts.nth(i).locator("b").textContent());
        await allProducts.nth(i).locator("text='Add To Cart'").click();
        console.log("Product found and added to cart");
        break;
    }   
}

//How to debug the API steps in playwright

  
});