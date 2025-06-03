
describe('Expert', () => {

    beforeEach(() => {
        cy.start()
    });

    it('Deve manipular os atributos de elementos do HTML', () => {
        // pode ser usado para testar segurança de um campo readonly...se editar é falha de segurança
        cy.get('#email').invoke('val', 'pedro@teste.com.br');

        // alterar o atributo/proprieDADE do campo de senha para texto
        cy.get('#password').invoke('attr', 'type', 'text').type('senha123')

        // remover um atributo, exemplo o estilo contido no class 
        cy.get('#password').invoke('removeAttr', 'class');

        // ocultar um elementro
        cy.contains('button', 'Entrar').invoke('hide').should('not.be.visible')

        // mostrar o elemento
        cy.contains('button', 'Entrar').invoke('show').should('be.visible')
    });

    it('Validando elementro flutante', () => {
        // melhor pratica para validar elemento flutuante
        cy.submitLogin('papito@webdojo.com', 'senha123')

        // cy.wait(2500)

        // cy.document().then((doc) => {
        //     // função nativa do cypress
        //     cy.writeFile('cypress/downloads/page.html', doc.documentElement.outerHTML) //guardar o html da pagina
        // })

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        // validar que toast não existe mais na pagina
        cy.wait(5000);
        cy.get('[data-sonner-toaster=true')
            .should('not.exist');

        // not.visible = não está visivel mas está no html
        // not.exist = não está visivel e não existe no html
    });

    it('Simulando a tecla TAB com cy.press', () => {
        // Esse teste pode ser usado para validar acessabilidade
        // acessar o body da pagina
        cy.get('body').press('Tab');

        //valida se o campo email tem o foco
        cy.focused().should('have.attr', 'id', 'email');

        // a partir do campo email, tab novamente e valida o campo senha com foco
        cy.get('#email').press('Tab');
        cy.focused().should('have.attr', 'id', 'password');
    });

    it('Utilizando teclas do teclado', () => {
        // Teclado ENTER
        cy.get('#email').type('teste@teste.com')
        cy.get('#password').type('senha123{Enter}')

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')
    });

   
});