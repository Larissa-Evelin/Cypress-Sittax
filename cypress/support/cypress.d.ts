declare namespace Cypress {
    interface Chainable {
      
      login(email: string, password: string): Chainable<void>;
  
      logout(): Chainable<void>;

      clearThenType(text: string): Chainable<Element>;

    }
  }