/// <reference types="Cypress" />

describe('user auth', () => {
    context('checks', () => {
        it('cheking server status page', () => {
            cy.checkServer()
        })
    })

    context('register page', () => {
        it.only('should register a user', () => {
            const registerRoute = Cypress.env('routes').front.signup
            cy.visit(registerRoute)

            cy.contains('Sign up to continue.')
            cy.contains('Do you already have an account?')
            cy.get('input').as('getInputs')

            cy.get('@getInputs').eq(0).should('exist').type('test123')
            cy.get('@getInputs').eq(1).should('exist').type('test@gmail.com')
            cy.get('@getInputs').eq(2).should('exist').type('password123123')

            cy.get('button').contains('Sign up').click()

            cy.contains('Username or email already exists', { timeout: 60000 })
        })
    })

    context('login page', () => {
        it('should log in a user', () => {
            const signinRoute = Cypress.env('routes').front.signin
            cy.visit(signinRoute)
            cy.get('input').as('getInputs')

            cy.get('@getInputs').eq(0).should('exist').type('test@gmail.com')
            cy.get('@getInputs').eq(1).should('exist').type('password123123')

            cy.get('button').eq(0).click()

            cy.location('pathname').should('eq', '/')
        })
    })
})