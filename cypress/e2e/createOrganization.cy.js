import { loginPage } from "../page_objects/LoginPage"
import { myOrganizationsPage } from "../page_objects/MyOrganizationsPage"
const  faker = require ('@faker-js/faker');
describe ('createOrganization', () => {
    let email = "milicanikolic123@gmail.com"
    let password = "Samarkomsve1"
    let organizationId;
    const organizationData = {
        organizationName: faker.name.firstName(),
        }

    before('visit website and login', () => {
        cy.visit('/')
        loginPage.login(email, password)
        cy.url().should('not.include','/login')
        cy.url().should('include', '/my-organizations')
    })

    it.only('create using intercept', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/organizations'
        }).as('successfulCreation')
        cy.url().should('include', '/my-organizations')
        myOrganizationsPage.createOrganization(
            organizationData.organizationName,
            )
        cy.wait('@successfulCreation').then(interception => {
            organizationId = interception.response.body.id
            expect(interception.response.statusCode).eq(201)
            expect(interception.response.body.name).eq(organizationData.organizationName)
            cy.visit(`/organizations/${organizationId}/settings`)
        })
    })
})