class checkout {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.waitForDivLi = page.locator("div li").first().waitFor();
        this.checkoutButton = page.locator("text='Checkout'");
        this.countryInput = page.getByPlaceholder("Select Country");
        this.waitForCountryResults = page.locator(".ta-results");
        this.dropdownvalue = page.locator("[class*='ta-item']");
        this.userName = page.locator(".user__name [type='text']");
        this.userInput = page.locator("[class$='input txt']");
        this.submitButton = page.locator(".action__submit");
        this.order = page.locator("a:has-text('PLACE ORDER')");
        this.orderConfirmationButton = page.locator('a.btnn.action__submit.ng-star-inserted:visible');
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator("label[class='ng-star-inserted']");
        this.ordersButton = page.locator("button[routerlink*='myorders']");
        this.ordersTable = page.locator("tbody");
        this.ordersRows = page.locator("tbody tr");
        this.OrderNo = "";
        this.OrderSummaryVerifyText = page.locator(".tagline");
        this.productN = page.locator("//div[@class='title']");


    }
    async checkoutProduct(userEmail) {
        await this.checkoutButton.click();
        await this.countryInput.pressSequentially("India", { delay: 200 });
        await this.waitForCountryResults.waitFor();
        await this.dropdownvalue.first().waitFor();
        const dropdownOptions = await this.dropdownvalue;
        console.log("Count is :: " + await dropdownOptions.count());
        for (let i = 0; i < await dropdownOptions.count(); ++i) {
            const text = await dropdownOptions.nth(i).textContent();
            console.log("Text is :: " + text);
            if (text.includes("India")) {
                await dropdownOptions.nth(i).click();
                console.log("India is selected");
                break;
            }
        }
        console.log("User email is :: " + await this.userName.first().textContent());
        this.expect(await this.userName.first().textContent()).toEqual(userEmail);
        await this.userInput.first().fill("123");
        await this.orderConfirmationButton.click();
        this.expect(await this.orderConfirmationText.textContent()).toEqual(" Thankyou for the order. ");
        this.OrderNo = await this.orderId.textContent();
        console.log(this.OrderNo);
        await this.ordersButton.click();
        await this.ordersTable.waitFor();
        console.log(await this.ordersRows.count());
        console.log(await this.ordersRows.allTextContents());

    }
    async orderConfirmation() {
        await this.ordersButton.click();
        await this.ordersTable.waitFor();
        const rows = await this.ordersRows;
        console.log(await rows.count());
        console.log(await rows.allTextContents());
        for (let i = 0; i < await rows.count(); i++) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (this.OrderNo.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                console.log("Order found in order history and click on view details ");
                const orderSummaryText = await this.OrderSummaryVerifyText.textContent();
                console.log("Order summary text is :: " + orderSummaryText);
                console.log(this.expect(await this.productN.textContent()).toBeTruthy());
                break;
            }
        }
    }
}
module.exports = { checkout };
