describe('Login', () => {

  beforeEach(() => {
    cy.start()
  });

  it('Deve logar com sucesso', () => {
    cy.submitLogin('papito@webdojo.com','katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')


    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')


  });

  it('Não deve logar com senha inválida', () => {
    cy.submitLogin('papito@webdojo.com','senha123')
    cy.shouldHaveAlert('Acesso negado! Tente novamente.')
  });

  it('Não deve logar com usuário inválido', () => {
    cy.submitLogin('404@webdojo.com','katana123')
    cy.shouldHaveAlert('Acesso negado! Tente novamente.')
  });

});