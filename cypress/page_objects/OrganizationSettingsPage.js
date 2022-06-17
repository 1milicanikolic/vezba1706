class OrganizationSettingsPage {

    get archiveBtn() {
        cy.get('button[class="vs-c-btn vs-c-btn--success vs-c-btn--spaced"]')
    }

}
export const organizationSettingsPage = new OrganizationSettingsPage()