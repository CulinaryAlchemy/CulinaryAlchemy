/// <reference types="cypress" />

const login = () => {
    cy.request('POST','https://culinaryalchemy.onrender.com/auth/sign-in', {
        email: 'test@gmail.com',
        password: 'password123123'
    }).then(res => {
        const {token, user} = res.body.data

        window.localStorage.setItem('accesss23', token)
        window.localStorage.setItem('user-data', JSON.stringify(user))

        cy.visit('http://localhost:5173/')
    })
}

Cypress.Commands.addAll({
    login
})