const { Builder } = require('selenium-webdriver');
const LoginAction = require('../actions/login.action');

const driver = new Builder()
    .forBrowser('chrome')
    .build();

describe('Login', () => {
    let driver;
    let loginAction;

    beforeEach(async () => {
        driver = await new builder().forBrowser('chrome').build();
        loginAction = new LoginAction(driver);
        await loginAction.openLoginPage('https://www.saucedemo.com/');
    });

    afterEach(async () => {
        await driver.quit();
    });

    it('should login with valid credentials', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginSuccess();
    });

    it('should login with invalid Username', async () => {
        await loginAction.inputUsername('admin');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');
    });
    it('should login with invalid password', async () => {
        await loginAction.inputUsername('standard_user');
        await loginAction.inputPassword('admin');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Username and password do not match any user in this service');
    });

    it('should login with locked_out_user', async () => {
        await loginAction.inputUsername('locked_out_user');
        await loginAction.inputPassword('secret_sauce');
        await loginAction.clickLoginButton();
        await loginAction.assertLoginFailed('Epic sadface: Sorry, this user has been locked out!!');
    });


});