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
      cy.get('[data-joy-color-scheme="light"]')
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