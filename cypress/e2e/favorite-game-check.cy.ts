describe("favorite-game-check", () => {
  it("success-case", () => {
    cy.visit("/");

    cy.wait(2000);

    cy.get('[data-testid="favorite-button-TAAifFP590"]').click();

    cy.get('[data-testid="favorite-icon-button"]').click();

    cy.url().should("include", "/favorite");

    cy.get('[data-testid="game-card-TAAifFP590"]').should("contain", "Root");
  });
});
