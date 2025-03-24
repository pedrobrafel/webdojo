describe('Kanban board', () => {

    it('Deve mover uma tarefa de ToDo para Done e atualizar o board', () => {
        cy.start()
        cy.submitLogin('papito@webdojo.com', 'katana123')

        cy.goTo('Kanban', 'Kanban Board')

        const dataTransfer = new DataTransfer()// É um objeto que simula a transferência de dados entre elementos

        cy.contains('div[draggable=true]', 'Documentar API')
            .trigger('dragstart', { dataTransfer })// Dispara o evento de dragstart no elemento

        cy.get('.column-done')
            .trigger('drop', { dataTransfer })// Dispara o evento de drop no elemento
            .find('h3')
            .should('have.text', 'Done (4)')// Verifica se o elemento foi movido para a coluna Done

        cy.get('.column-done')
            .should('include.text', 'Documentar API')// Verifica se o elemento foi movido para a coluna Done
            .and('include.text', 'Criar documentação da API com Swagger')// include.text verifica se o texto está contido no elemento

    });
});