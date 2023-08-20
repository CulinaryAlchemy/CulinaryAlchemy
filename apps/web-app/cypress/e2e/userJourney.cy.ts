/// <reference types="Cypress" />

describe('user journey', () => {

  context('dropdown menu', () => {
    beforeEach(() => {
      cy.login()
      cy.get('button').click()
    })

    it('should show the dropdown menu', () => {
      cy.get('button').click()

      cy.contains('Settings')
      cy.contains('Theme')
      cy.contains('Language')
      cy.contains('Sign out')
    })

    it('should change the theme', () => {
      cy.contains('Theme').click()
      /*Next line does not work on CI/CD :(
      cy.contains('Theme').should('have.css', 'color', 'rgb(37, 37, 45)')
      */
    })

    it('should change the language', () => {
      cy.contains('Language').click()
      cy.contains('es')
    })

    it('should sign out the user', () => {
      cy.contains('Sign out').click()
      cy.location('pathname').should('eq', '/login')
    })
  })
})