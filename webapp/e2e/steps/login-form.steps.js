const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/login-form.feature');


let page;
let browser;


defineFeature(feature, test => {
    let username;
    let password;

    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            : await puppeteer.launch({ headless: false });

        page = await browser.newPage();
        //Way of setting up the timeout
        setDefaultOptions({ timeout: 50000 })

        await page
            .goto("http://localhost:3000/login", {
                waitUntil: "networkidle0",
            })
            .catch(() => { });
        username = "Prueba"
        password = "PruebaPSW"
        await expect(page).toClick("button", { text: "Don't have an account? Register here." });
        await expect(page).toFill('input[name="name"]', 'Prueba');
        await expect(page).toFill('input[name="surname"]', 'Prueba');
        await expect(page).toFill('input[name="username"]', username);
        await expect(page).toFill('input[name="password"]', password);
        await expect(page).toFill('input[name="passwordRepeat"]', password);
        await expect(page).toClick("button", { text: "Registrarse" });
        await page.waitForSelector('a.nav__link', { text: 'Login', visible: true });
        await expect(page).toClick('a.nav__link', { text: 'Login' });
    });

    test('The user is registered in the site', ({ given, when, then }) => {

        given('An user', async () => {
            username = "Prueba";
            password = "PruebaPSW";
            
        });

        when('I fill the data in the form and press submit', async () => {
            await page.waitForSelector('input[name="username"]');
            await expect(page).toFill('input[name="username"]', username);
            await expect(page).toFill('input[name="password"]', password);
            await Promise.all([
                page.click('button', { text: 'Login' }),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
            ]);
        });

        then('The home page will appear', async () => {
            await expect(page).toMatchElement("button", { text: "JUGAR" });
        });
    })

    afterAll(async () => {
        browser.close()
    })

});