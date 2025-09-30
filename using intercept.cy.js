/// <reference types="cypress" />

describe('OrangeHRM Login Feature dengan Intercept', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('TC-001: Login dengan username & password benar', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.contains('button', 'Login').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
    cy.url().should('include', '/dashboard');
  });

  it('TC-002: Login dengan username salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('admin123');
    cy.contains('button', 'Login').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC-003: Login dengan password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongpass');
    cy.contains('button', 'Login').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC-004: Login dengan username & password kosong', () => {
    cy.contains('button', 'Login').click();

    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain', 'Required');
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain', 'Required');
  });

  it('TC-005: Login dengan password kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.contains('button', 'Login').click();

    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('contain', 'Required');
  });

  it('TC-006: Login dengan username kosong', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.contains('button', 'Login').click();

    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('contain', 'Required');
  });
});