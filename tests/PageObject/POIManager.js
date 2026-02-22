const{Dashboard} = require("./Dashboard");
const{checkout} = require("./checkout");
const{LoginPage} = require("./LoginPage");
class POIManager {
    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new Dashboard(page);
        this.checkout = new checkout(page, expect);
    }
    loginPage() {
        return this.loginPage;
    }
    dashboardPage() {
        return this.dashboardPage;
    }
    checkout() {
        return this.checkout;
    }

}
module.exports = { POIManager };
