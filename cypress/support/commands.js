require("@cypress/snapshot").register();

Cypress.Commands.add("login", (username, password) => {
  cy.request("POST", "/login", `email=${username}&password=${password}`);
});

Cypress.Commands.add("wireReset", () => {
  cy.request(
    "DELETE",
    `${Cypress.env("MOCK_SERVER")}/__admin/mappings?apiToken=${Cypress.env("MOCKLAB_TOKEN")}`,
  );
});

Cypress.Commands.add("wireProxy", delegateUrl => {
  cy.request(
    "POST",
    `${Cypress.env("MOCK_SERVER")}/__admin/mappings?apiToken=${Cypress.env("MOCKLAB_TOKEN")}`,
    {
      priority: 10,
      request: {
        method: "ANY",
      },
      response: {
        proxyBaseUrl: delegateUrl,
      },
    },
  );
});
