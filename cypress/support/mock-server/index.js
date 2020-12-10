import { mockServerClient } from "mockserver-client";

Cypress.Commands.add("mockServer", () => cy.wrap(mockServerClient("localhost", 1080)))

Cypress.Commands.add("resetMockServer", () => {
    cy.mockServer().then(c => c.reset())
})

Cypress.Commands.add("mockGetRequest", (path, fixture) => {
    cy.fixture("global-feed/two-articles").then(data =>
        cy.mockServer().then(c =>
            c.mockAnyResponse({
                httpRequest: {
                    method: "GET",
                    path: "/articles",
                },
                httpResponse: {
                    body: data
                }
            })
        )
    )
})