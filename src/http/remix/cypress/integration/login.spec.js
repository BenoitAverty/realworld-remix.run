describe("Login", () => {
  it("Allows login in", () => {
    // GIVEN
    cy.visit("/login");

    // WHEN
    cy.get('[placeholder="Email"]').type("benoit@benoit.benoit");
    cy.get('[placeholder="Password"]').type("benoitbenoit");
    cy.contains("button", "Sign In").click();

    // THEN
    cy.get('[data-testid="navbar"]').within(() => {
      cy.contains("@Benoit");
      cy.contains("New Post");
      cy.contains("Settings");
    });

    cy.location("pathname").should("eq", "/feed");
  });
});
