/// <reference types="Cypress" />

describe('user journey', () => {
    it('should register a user', () => {
      cy.visit('http://localhost:5173/register')
      
      cy.contains('Register to continue.')
      cy.contains('Do you already have an account?')
  
      cy.get('input').as('getInputs')
  
      cy.get('@getInputs').eq(0).should('exist').type('test/cypress')
      cy.get('@getInputs').eq(1).should('exist').type('test/cypress@gmail.com')
      cy.get('@getInputs').eq(2).should('exist').type('test/cypress123123')

      cy.get('button').contains('Register').click()

      cy.contains('Created')
    })
})