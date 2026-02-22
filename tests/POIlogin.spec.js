const { test, expect } = require("@playwright/test");
const{POIManager}=require("./PageObject/POIManager") 
const dataset = JSON.parse(JSON.stringify(require("./testdata.json")) )  ;   
test('@e2e POI Login dataset.productName', async({page}) => {
//const ProductTitles = page.locator(".card-body a");
const logg = new POIManager(page,expect);
const productName = dataset.productName;
const username = dataset.userEmail;
const password = dataset.userPassword;
await logg.loginPage.goTo();
await logg.loginPage.login(username, password)
await logg.dashboardPage.searchProduct(productName);
await logg.dashboardPage.goToCart();
await logg.checkout.checkoutProduct(username);
await logg.checkout.orderConfirmation();


}  );
