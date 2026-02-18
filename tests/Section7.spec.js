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

test.only('Section7_calendar', async({page}) => {
    const monthNumber = "6";
    const dayNumber = "15";
    const year ="2027";
    const expectedList = [monthNumber, dayNumber, year];
  
   await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
   await page.locator(".react-date-picker__inputGroup").click();
   await page.locator(".react-calendar__navigation__label").click();
   await page.locator(".react-calendar__navigation__label").click();
   await page.getByText(year).click();
   await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1 ).click();
   await page.locator("//abbr[text()='"+dayNumber+"']").click();
const inputs = await page.locator(".react-date-picker__inputGroup__input");
for(let i=0; i<await inputs.count(); i++){
    const value = await inputs.nth(i).inputValue();
    console.log(value);
    expect(value).toBe(expectedList[i]);    
}


   await page.pause();

  
   

    });
