    describe(`Accessibility tests with cypress and axe`, () => {
      beforeEach(() => {
        cy.visit("http://localhost:5173/");
        cy.injectAxe(); 
      });
  
      it("should have no detectable a11y violations on load", () => {
        cy.checkA11y();
      });
    });
  