const {test, expect} = require("@playwright/test");
test('Section7', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator(".form-group input[name='name']").fill("Suresh");
    await page.locator("input[name='email']").fill("sureshpasam94@gmail.com");
    await page.getByPlaceholder("Password").fill("Chaitu@143");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Student").check();
    console.log(await page.getByLabel("Student").isChecked());
await page.getByLabel("Gender").selectOption("Female");
//await page.locator("input[name='bday']").fill("10-10-1992");
await page.getByRole("button",{name:"Submit"}).click();
await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
await page.getByRole("link",{name:"Shop"}).click();
 await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
console.log(await page.locator("app-card").filter({hasText:'Nokia Edge'}));

    await page.pause();
    //When we use the getByLabel method, it will automatically find the element based on the label text and perform the action on it. This is particularly useful for form elements like checkboxes, radio buttons, and select dropdowns, where the label provides a clear association with the input element. By using getByLabel, we can write more readable and maintainable tests that closely resemble how users interact with the application.

});