import {mockServerClient} from "mockserver-client"

describe('Global Feed', () => {
    it('Shows lates articles', () => {
        cy.resetMockServer()
        cy.mockGetRequest("/articles", "global-feed/two-articles")

        // WHEN
        cy.visit("/")

        // THEN
        cy.get("[data-testid=\"article-summary\"]").first().within(() => {
            cy.contains("h1", "An article about Remix")
            cy.contains("Remix is an awesome react framework")
            cy.contains("Benoit Averty")
        })

        cy.get("[data-testid=\"article-summary\"]").last().within(() => {
            cy.contains("h1", "An article about React")
            cy.contains("React is a UI framework")
            cy.contains("Benoit Averty")
        })
    })
})