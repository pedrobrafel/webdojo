describe('Studio', () => {
  it('Exemplo do Cypress Studio', () => {
    cy.visit('https://example.cypress.io')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('h1').should('be.visible');
    cy.get('h1').should('have.text', 'Kitchen Sink');
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Deve logar com sucesso', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');
    cy.get('#email').clear('p');
    cy.get('#email').type('papito@webdojo.com');
    cy.get('#password').clear();
    cy.get('#password').type('katana123');
    cy.contains('button','Entrar').click();
    cy.get('h1').should('have.text', 'Dashboard');
    cy.get('[data-cy="user-name"]').should('have.text', 'Fernando Papito');
    /* ==== End Cypress Studio ==== */
  });
})