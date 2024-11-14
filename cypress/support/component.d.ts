// cypress/support/component.d.ts
/// <reference types="cypress" />

declare global {
    namespace Cypress {
      interface Chainable {
        mount: typeof import('cypress/angular').mount
      }
    }
  }  

  export {};