/// <reference types="Cypress" />

describe('user journey', () => {
  context('register page', () => {
    it('should register a user', () => {
      cy.visit('http://localhost:5173/register')
      
      cy.contains('Register to continue.')
      cy.contains('Do you already have an account?')
      cy.get('input').as('getInputs')
  
      cy.get('@getInputs').eq(0).should('exist').type('testcypress')
      cy.get('@getInputs').eq(1).should('exist').type('testcypress@gmail.com')
      cy.get('@getInputs').eq(2).should('exist').type('testcypress123123')

      cy.get('button').contains('Register').click()

      cy.contains('Bad request').should('exist')
    })
  })

  context('login user', () => {
    it('should log in a user', () => {
      cy.visit('http://localhost:5173/login')
      cy.get('input').as('getInputs')
  
      cy.get('@getInputs').eq(0).should('exist').type('testcypress@gmail.com')
      cy.get('@getInputs').eq(1).should('exist').type('testcypress123123')
  
      cy.get('button').eq(1).click()

      cy.contains('Bad request').should('exist')
    })
  })

})