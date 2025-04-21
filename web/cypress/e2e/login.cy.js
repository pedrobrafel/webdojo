import { getToday } from "../support/utils";

describe('Login', () => {
  beforeEach(() => {
    cy.start()
  });

  it('Deve logar com sucesso', () => {
    cy.submitLogin('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')


    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    // getCookie é uma funçao nativa do cypress que consegue lidar com essa informacao
    // vou obter o cookie e verificar se existe e o valor
    cy.getCookie('login_date').should('exist')
    cy.getCookie('login_date').should((cookie) => {
      expect(cookie.value).to.eq(getToday())
    })

    // A função window temos os recursos do navegador em tempo de execução
    // vou guardar o token e validar com regex no formato md5
    cy.window().then((win)=>{
     const token =  win.localStorage.getItem('token')
     expect(token).to.match(/^[a-fA-F0-9]{32}$/)
    })

  });

  it('Não deve logar com senha inválida', () => {
    cy.submitLogin('papito@webdojo.com', 'senha123')
    cy.shouldHaveAlert('Acesso negado! Tente novamente.')
  });

  it('Não deve logar com usuário inválido', () => {
    cy.submitLogin('404@webdojo.com', 'katana123')
    cy.shouldHaveAlert('Acesso negado! Tente novamente.')
  });

});