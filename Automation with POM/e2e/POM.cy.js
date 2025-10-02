/// <reference types="cypress" />
import LoginPage from "../../pageObjects/LoginPage";
import credentials from "../../fixtures/credentials.json";

const loginPage = new LoginPage();

describe('OrangeHRM Login Feature - POM', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  it('TC-001: Login dengan username & password benar', () => {
    loginPage.typeUsername(credentials.validUser.username);
    loginPage.typePassword(credentials.validUser.password);
    loginPage.clickLogin();
    loginPage.assertDashboard();
  });

  it('TC-002: Login dengan username salah', () => {
    loginPage.typeUsername(credentials.wrongUser.username);
    loginPage.typePassword(credentials.wrongUser.password);
    loginPage.clickLogin();
    loginPage.assertErrorMessage('Invalid credentials');
  });

  it('TC-003: Login dengan password salah', () => {
    loginPage.typeUsername(credentials.wrongPass.username);
    loginPage.typePassword(credentials.wrongPass.password);
    loginPage.clickLogin();
    loginPage.assertErrorMessage('Invalid credentials');
  });

  it('TC-004: Login dengan username & password kosong', () => {
    loginPage.clickLogin();
    loginPage.assertRequired(2, 'Required'); // field username
    loginPage.assertRequired(3, 'Required'); // field password
  });

  it('TC-005: Login dengan password kosong', () => {
    loginPage.typeUsername(credentials.validUser.username);
    loginPage.clickLogin();
    loginPage.assertRequired(3, 'Required');
  });

  it('TC-006: Login dengan username kosong', () => {
    loginPage.typePassword(credentials.validUser.password);
    loginPage.clickLogin();
    loginPage.assertRequired(2, 'Required');
  });
});