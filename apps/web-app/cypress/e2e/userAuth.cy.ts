/// <reference types="Cypress" />

describe('user auth', () => {
    context('register page', () => {
        it('should register a user', () => {
            cy.visit('http://localhost:5173/register')

            cy.contains('Sign up to continue.')
            cy.contains('Do you already have an account?')
            cy.get('input').as('getInputs')

            cy.get('@getInputs').eq(0).should('exist').type('test')
            cy.get('@getInputs').eq(1).should('exist').type('test@gmail.com')
            cy.get('@getInputs').eq(2).should('exist').type('password123123')

            cy.get('button').contains('Sign up').click()

            cy.contains('Username or email already exists')
        })
    })

    context('login page', () => {
        it('should log in a user', () => {
            cy.visit('http://localhost:5173/login')
            cy.get('input').as('getInputs')

            cy.get('@getInputs').eq(0).should('exist').type('test@gmail.com')
            cy.get('@getInputs').eq(1).should('exist').type('password123123')

            cy.get('button').eq(0).click()

            cy.location('pathname').should('eq', '/')
        })
    })
})