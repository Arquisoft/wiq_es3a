const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/register-form.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 30000 })

    await page
      .goto("http://localhost:3000/login", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is not registered in the site', ({given,when,then}) => {
    
    let username;
    let password;

    given('An unregistered user', async () => {
      username = "Prueba"
      password = "PruebaPSW"
      await expect(page).toClick("button", { text: "Don't have an account? Register here." });
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFill('input[name="name"]', 'Prueba');
      await expect(page).toFill('input[name="surname"]', 'Prueba');
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toFill('input[name="passwordRepeat"]', password);
      await Promise.all([
        page.click('button', { text: 'Registrarse' }),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
      ]);
    });

    then('A confirmation message should be shown in the screen', async () => {
        await expect(page).toMatchElement("h1", { text: "BIENVENIDO" });
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});