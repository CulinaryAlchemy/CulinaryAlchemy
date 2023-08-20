/// <reference types="cypress" />

const login = () => {
    cy.log('sign-in')
    cy.request('POST','https://culinaryalchemy.onrender.com/auth/sign-in', {
        email: 'test@gmail.com',
        password: 'password123123'
    }).then(res => {
        const {token, user} = res.body.data

        window.localStorage.setItem('accesss23', token)
        window.localStorage.setItem('user-data', JSON.stringify(user))

        const homePath = Cypress.env('routes').front.home
        cy.visit(homePath)
    })
}

const checkServer = () => {
    cy.log('check if the server is on')

    cy.request('GET','https://culinaryalchemy.onrender.com/user/username/culinaryalchemy')
}

Cypress.Commands.addAll({
    login,
    checkServer
})