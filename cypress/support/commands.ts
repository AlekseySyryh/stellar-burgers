/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      addBun(): Chainable<void>;
      changeBun(): Chainable<void>;
      addMains(): Chainable<void>;
      openModalConstructor(): Chainable<void>;
      openModalOrder(): Chainable<void>;
      checkProfileFormInOriginalState(): Chainable<void>;
      modifyProfileForm(): Chainable<void>;
      doOrder(): Chainable<void>;
      goToLogin(): Chainable<void>;
      doLogin(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('addBun', () => {
  cy.get('[data-cy=component_bun_1] button').click();
});

Cypress.Commands.add('changeBun', () => {
  cy.get('[data-cy=component_bun_1] button').click();
  cy.get('[data-cy=component_bun_2] button').click();
});

Cypress.Commands.add('addMains', () => {
  cy.get('[data-cy=component_main_1] button').click();
  cy.get('[data-cy=component_main_2] button').click();
  cy.get('[data-cy=component_main_1] button').click();
});

Cypress.Commands.add('openModalConstructor', () => {
  cy.get('[data-cy=component_main_1]').click();
});

Cypress.Commands.add('openModalOrder', () => {
  cy.get('[data-cy=link-98278]').click();
});

Cypress.Commands.add('checkProfileFormInOriginalState', () => {
  cy.get('[name=name]').should('have.attr', 'value', 'Name');
  cy.get('[name=email]').should('have.attr', 'value', 'email@email');
  cy.get('[name=password]').should('have.attr', 'value', '');
});

Cypress.Commands.add('modifyProfileForm', () => {
  cy.get('[name=name]').type('1');
  cy.get('[name=email]').type('1');
  cy.get('[name=password]').type('bbhbikbk');
});

Cypress.Commands.add('doOrder', () => {
  cy.get('[data-cy=constructor]').click();
  cy.get('[data-cy=component_bun_1] button').click();
  cy.get('[data-cy=component_main_1] button').click();

  cy.get('[data-cy=place-order]').click();
});

Cypress.Commands.add('goToLogin', () => {
  cy.get('[data-cy=profile]').click();
});

Cypress.Commands.add('doLogin', () => {
  cy.get('input[name=email]').type('email@email');
  cy.get('input[name=password]').type('QZSDjhh');
  cy.get('form').submit();
});
