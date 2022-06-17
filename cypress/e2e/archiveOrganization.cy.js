import { organizationSettingsPage } from "../page_objects/OrganizationSettingsPage";
const  faker = require ('@faker-js/faker');
import { loginPage } from "../page_objects/LoginPage"
import { myOrganizationsPage } from "../page_objects/MyOrganizationsPage"
describe ('archive created organization', () => {
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
    
    it('create using intercept', () => {
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

    it('Archive with intercept', () => {
        organizationSettingsPage.archiveBtn.click();
        cy.intercept({
            method: 'PUT',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/18205/status'
        }).as('archive')

        cy.url().should('include', '/settings');
        
        cy.wait('@archive').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
    })
    })
    })