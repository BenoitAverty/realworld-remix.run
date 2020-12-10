describe('Global Feed', () => {
    it('Shows lates articles', () => {
        // WHEN
        cy.visit("/")

        // THEN
        cy.contains("Humanity")
        cy.contains("About Humens")
    })
})