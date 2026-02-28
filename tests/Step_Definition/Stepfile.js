const { Given,When,Then } = require('@cucumber/cucumber')
const{LoginPage} = require("./LoginPage");
const { test, expect,playwright } = require("@playwright/test");

Given('login with {UserName} and {Password}', async function (userName,passWord) {
  console.log(`Cukes: ${cukes}`)
});