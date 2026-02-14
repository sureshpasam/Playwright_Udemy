const {test, expect} = require("@playwright/test");
test('Section6', async({page}) => {
const productName = "ZARA COAT 3";    
const allProducts = page.locator(".card-body");    
const Email = page.locator("input[id='userEmail']");
const Password = page.locator("input[id='userPassword']");
const SignInBtn = page.locator("#login");
//const ProductTitles = page.locator(".card-body a");
await page.goto('https://rahulshettyacademy.com/client/');
await Email.fill("sureshpasam94@gmail.com");
await Password.fill("Chaitu@143");
await SignInBtn.click();
await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().textContent();
console.log(await page.locator(".card-body b").allTextContents());
const count = await allProducts.count();
for(let i=0; i<count; i++){
    // if(await allProducts.nth(i).locator(".card-body b").textContent() === "ZARA COAT 3"){
    //     await allProducts.nth(i).locator(".card-body a").click();
    //     break;
    // }
    if(await allProducts.nth(i).locator("b").textContent() === productName){
        console.log(await allProducts.nth(i).locator("b").textContent());
        await allProducts.nth(i).locator("text='Add To Cart'").click();
        console.log("Product found and added to cart");
        break;
    }
}
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('"+productName+"')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text='Checkout'").click();
    await page.getByPlaceholder("Select Country").pressSequentially("India",{delay:200});
const drop = await page.locator(".ta-results").waitFor();
//drop.waitFor();
await page.locator("[class*='ta-item']").first().waitFor();
console.log("Search Text of the:: "+await page.locator("[class*='ta-item']").first().textContent() );
console.log("Search Text of the:: "+await page.locator("[class*='ta-item']").last().textContent() );
const dropdownOptions =await page.locator("[class*='ta-item']");
 console.log("Count is :: "+await dropdownOptions.count());
  
for(let i = 0; i < await dropdownOptions.count(); ++ i){
       console.log("Text is :: "+await dropdownOptions.count());
    const text = await dropdownOptions.nth(i).textContent();
    console.log("Text is :: "+text);
    if( text === "India"){
        await dropdownOptions.nth(i).click();
        console.log("India is selected");
        break;
    }    
    
    expect(await page.locator(".user__name [type='text']").first().textContent()).toEqual("sureshpasam94@gmail.com");
    await page.locator("[class$='input txt']").first().fill("123");
    //await page.locator(".action__submit").click();
    //await page.locator("a:has-text('PLACE ORDER')").click();
    await page.locator("[class$='btnn action__submit ng-star-inserted']").click();
    expect(await page.locator(".hero-primary").textContent()).toEqual(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-start-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();

    //await page.locator("tbody tr th").first().waitFor();
    const rows = await page.locator("tbody tr");
    console.log(await rows.count());
    console.log(await rows.allTextContents());
    for(let i=0; i< await rows.count(); i++){
         const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
    }
 const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

}

});