const {test, expect,request} = require("@playwright/test");
// test.beforeALL and test.beforeEach are the hooks which will execute before all the tests and before each test respectively. We can use these hooks to do some pre-requisite work before executing the tests. For example, we can use test.beforeAll to launch the browser and test.beforeEach to navigate to the URL before each test.
const payload = {"userEmail": "sureshpasam94@gmail.com",userPassword: "Chaitu@143"};
const orderPayload = {"orders": [{"country": "India", "productOrderedId": "6262e990e26b7e1a10e89bf0"}]};
let token = "";
test.beforeEach(async({request}) => {
// writing the code to get the access token and store it in the environment variable. We can use this access token in our tests to authenticate the API requests. This way we don't have to write the code to get the access token in each test and we can reuse the same access token for all the tests.
const response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
    data: payload            
});
expect(response.status()).toBe(200);
const responseJson = await response.json();
console.log(responseJson);
 token = responseJson.token; // this will store the token in the environment variable, we can use this token in our tests to authenticate the API requests. This way we don't have to write the code to get the access token in each test and we can reuse the same access token for all the tests.  
console.log("Token is::"+token);
console.log("User ID is::"+responseJson.userId);
console.log("Message::"+responseJson.message);
});


test('Login the script and Order', async({page,request}) => {
page.addInitScript(value => {
    window.localStorage.setItem("token", value);
},token);

const API_request_order = await request.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
    data: orderPayload,
    headers: {'Authorization': token,'content-type': "application/json"}
});
expect(API_request_order.status()).toBe(201);
const orderResponse = await API_request_order.json();
console.log(orderResponse);
expect(orderResponse.message).toBe("Order Placed Successfully");
expect(orderResponse.orders[0].productOrderedId).toBe("6262e990e26b7e1a10e89bf0");
expect(orderResponse.orders[0].country).toBe("India");
expect(orderResponse.orders[0]._id).toBeTruthy();
expect(orderResponse.orders[0].orderDate).toBeTruthy();
expect(orderResponse.orders[0].orderTime).toBeTruthy();
expect(orderResponse.orders[0].status).toBe("placed");
expect(orderResponse.orders[0].__v).toBe(0);
});

/*
const productName = "ZARA COAT 3";
await page.goto('https://rahulshettyacademy.com/client/');
const allProducts = page.locator(".card-body");
const titles  = await page.locator(".card-body b").allTextContents();
console.log(titles);
for(let i=0; i<await allProducts.count(); i++){ 
    if(await allProducts.nth(i).locator("b").textContent() === productName){
        console.log(await allProducts.nth(i).locator("b").textContent());
        await allProducts.nth(i).locator("text='Add To Cart'").click();
        console.log("Product found and added to cart");
        break;
    }
}
    */


//});



