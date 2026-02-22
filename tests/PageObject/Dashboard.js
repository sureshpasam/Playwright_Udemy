class Dashboard {
    constructor(page) {
        this.page = page;
        this.product = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");

    }
    async searchProduct(productName) {

       const title = this.productText.allTextContents();
       console.log(title);
        for (let i = 0; i < await this.product.count(); ++i) {
            console.log("Text is :: " + await this.product.nth(i).textContent());
            if (await this.product.nth(i).locator("b").textContent() === productName) {
                console.log(await this.product.nth(i).textContent());
                await this.product.nth(i).locator("text='Add To Cart'").click();
                console.log("Product found and added to cart");
                break;
            }

        }


    }
    async goToCart() {
        await this.cart.click();
    }

}
module.exports = { Dashboard};
