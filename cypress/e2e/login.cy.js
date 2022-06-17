/// <reference types="Cypress" />
import { loginPage } from "../page_objects/LoginPage"


describe('login', () => {
    let email = "milicanikolic123@gmail.com"
    let password = "Samarkomsve1"

    before('visit website', () => {
        cy.visit('/')
})

    it('Login with intercept', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/login'
        }).as('validLogin')

        cy.url().should('include', '/login');
        loginPage.login(email, password);
        cy.wait('@validLogin').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
    })

    cy.url().should('not.include', '/login');
    cy.get('div[class="vs-l-my-organizations__content"]').should('be.visible')
    })
})