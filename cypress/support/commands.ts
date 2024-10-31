/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email: string, password:string) => { 
    cy.intercept("POST", "**/login").as("login");
    cy.visit('/'); 
    cy.get('#emailUsuarioAuth').type(email);
    cy.get('#passwordUsuarioAuth').type(password);
    cy.contains('button', 'Acessar').click();
    cy.wait("@login").then((result) => {
        const token = (result.response?.body as { token: string }).token;
        Cypress.env("token", token);
        cy.saveLocalStorage();
      });
 })

 Cypress.Commands.add("clearThenType", { prevSubject: true }, (subject: JQuery<HTMLElement>, text: string) => {
  cy.wrap(subject).clear().type(text);
}
);

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }