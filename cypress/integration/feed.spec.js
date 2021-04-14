describe("feed", () => {
  beforeEach(() => {
    cy.wireReset();
    cy.wireProxy(Cypress.env("API_URL"));
  });

  it("shows articles summaries", () => {
    cy.fixture("global-feed/two-articles.json").then(body => {
      cy.request(
        "POST",
        `${Cypress.env("MOCK_SERVER")}/__admin/mappings?apiToken=${Cypress.env("MOCKLAB_TOKEN")}`,
        {
          request: {
            method: "GET",
            url: "/api/articles?offset=0&limit=20",
          },
          response: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          },
        },
      );
    });

    cy.visit("/");

    // Assertions about the content... I would probably include more by making a custom command to test an article summary.
    cy.contains("An article about Remix");
    cy.contains("An article about React");

    cy.get(".article-preview").snapshot();

    cy.scrollTo(0, 1000);
    cy.contains("You've read everything !");
  });

  it("revalidates on focus", () => {
    cy.fixture("global-feed/two-articles.json").then(body => {
      cy.request(
        "POST",
        `${Cypress.env("MOCK_SERVER")}/__admin/mappings?apiToken=${Cypress.env("MOCKLAB_TOKEN")}`,
        {
          request: {
            method: "GET",
            url: "/api/articles?offset=0&limit=20",
          },
          response: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          },
        },
      );
    });

    cy.visit("/");

    cy.contains("An article about Remix");
    cy.contains("An article about React");
    cy.get('[data-testid="article-summary"]').should("have.length", 2);

    cy.fixture("global-feed/three-articles.json").then(body => {
      cy.request(
        "POST",
        `${Cypress.env("MOCK_SERVER")}/__admin/mappings?apiToken=${Cypress.env("MOCKLAB_TOKEN")}`,
        {
          request: {
            method: "GET",
            url: "/api/articles?offset=0&limit=20",
          },
          response: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          },
        },
      );
    });

    cy.document().trigger("focus");

    cy.contains("An article about Cypress");
    cy.contains("An article about Remix");
    cy.contains("An article about React");
    cy.get('[data-testid="article-summary"]').should("have.length", 3);
  });
});
