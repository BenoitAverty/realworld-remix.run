describe("editor", () => {
  beforeEach(() => {
    cy.wireReset();
    cy.wireProxy(Cypress.env("API_URL"));
    cy.login("benoit@benoit.benoit", Cypress.env("CONDUIT_PASSWORD"));
    // cy.wireProxy(Cypress.env("API_URL"));
  });

  it("Allows posting an article", () => {
    // GIVEN
    cy.request(
      "POST",
      `${Cypress.env("MOCK_SERVER")}/__admin/mappings?apiToken=${Cypress.env("MOCKLAB_TOKEN")}`,
      {
        request: {
          method: "POST",
          url: "/api/articles",
          bodyPatterns: [
            {
              ignoreArrayOrder: true,
              ignoreExtraElements: null,
              equalToJson:
                '{\n  "article": {\n  "title": "test article",\n  "description": "this is the description",\n  "body": "this is the body",\n  "tagList": ["js", "react"]\n}}',
            },
          ],
        },
        response: {
          status: 200,
          headers: { "Content-Type": "application/json" },
          body:
            '{\n  "article": {\n    "title": "test article",\n    "slug": "test-article-o4om4x",\n    "body": "this is the body",\n    "createdAt": "2021-04-13T14:23:39.928Z",\n    "updatedAt": "2021-04-13T14:23:39.928Z",\n    "tagList": [\n      "js",\n      "react"\n    ],\n    "description": "this is the description",\n    "author": {\n      "username": "Benoit",\n      "bio": "I\'m a developer and trainer at ZenikaRennes",\n      "image": "",\n      "following": false\n    },\n    "favorited": false,\n    "favoritesCount": 0\n  }\n}',
        },
      },
    );

    cy.request(
      "POST",
      `${Cypress.env("MOCK_SERVER")}/__admin/mappings?apiToken=${Cypress.env("MOCKLAB_TOKEN")}`,
      {
        request: {
          method: "POST",
          url: "/api/articles/test-article-o4om4x",
        },
        response: {
          status: 200,
          headers: { "Content-Type": "application/json" },
          body:
            '{\n  "article": {\n    "title": "test article",\n    "slug": "test-article-o4om4x",\n    "body": "this is the body",\n    "createdAt": "2021-04-13T14:23:39.928Z",\n    "updatedAt": "2021-04-13T14:23:39.928Z",\n    "tagList": [\n      "js",\n      "react"\n    ],\n    "description": "this is the description",\n    "author": {\n      "username": "Benoit",\n      "bio": "I\'m a developer and trainer at ZenikaRennes",\n      "image": "",\n      "following": false\n    },\n    "favorited": false,\n    "favoritesCount": 0\n  }\n}',
        },
      },
    );

    // WHEN
    cy.visit("/write");
    cy.get('[placeholder="Article Title"]').type("test article");
    cy.get('[placeholder="What\'s this article about?"]').type("this is the description");
    cy.get('[placeholder="Write your article (in markdown)"]').type("this is the body");
    cy.get('[placeholder="Enter tags"]').type("js, react");
    cy.contains("button", "Publish Article").click();

    // THEN
    cy.location("pathname").should("equal", "/article/test-article-o4om4x");
    cy.contains("h1", "Test article");
  });
});
