describe("game-filter-check", () => {
  it("success-case", () => {
    cy.visit("/");

    cy.wait(2000);

    cy.get('[data-testid="players-select"]')
      .parent()
      .click()
      .get('ul > li[data-value="6"]')
      .click();

    cy.get('[data-testid="playtime-select"]')
      .parent()
      .click()
      .get('ul > li[data-value="30"]')
      .click();

    cy.get('[data-testid="game-card-1cMyyO8wbc"]').should(
      "contain",
      "Two Rooms and a Boom"
    );
  });
});
