class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  typeUsername(username) {
    cy.get('input[name="username"]').clear().type(username);
  }

  typePassword(password) {
    cy.get('input[name="password"]').clear().type(password);
  }

  clickLogin() {
    cy.contains('button', 'Login').click();
  }

  assertDashboard() {
    cy.url().should('include', '/dashboard');
  }

  assertErrorMessage(message) {
    cy.get('.oxd-alert-content-text').should('contain', message);
  }

  assertRequired(fieldIndex, message) {
    cy.get(`:nth-child(${fieldIndex}) > .oxd-input-group > .oxd-text`)
      .should('contain', message);
  }
}

export default LoginPage;