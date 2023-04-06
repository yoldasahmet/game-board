describe("game-details-check", () => {
  it("success-case", () => {
    cy.visit("/");

    cy.wait(2000);

    cy.get('[data-testid="game-card-TAAifFP590"]').click();

    cy.url().should("include", "/detail");

    cy.get('[data-testid="game-desc-label"]').should(
      "contain",
      "Find adventure in this marvelous asymmetric game"
    );

    cy.get('[data-testid="game-title-label"]').should("contain", "Root");
  });
});
