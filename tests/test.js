const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

const driver = new Builder()
    .forBrowser('chrome')
    .build();

describe('Login', () => {
    it('should login with valid credentials', async () => {
        await driver.get('https://www.saucedemo.com/');
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();
        await driver.wait(until.elementLocated(By.className('title')), 5000);
        const title = await driver.findElement(By.className('title')).getText();
        assert.strictEqual(title, 'Products');

        await driver.quit();
    });
});