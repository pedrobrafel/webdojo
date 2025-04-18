describe('Gerenciamento de perfis no github', () => {

    beforeEach(() => {
        cy.loginXpress()
        cy.goTo('Tabela', 'Perfis do GitHub')
    });

    it('Deve poder cadastrar um novo perfil no GitHub', () => {

        cy.get('#name').type('Pedro Felix')
        cy.get('#username').type('pedro.felix')
        cy.get('#profile').type('QA')

        cy.contains('button[type=submit]', 'Adicionar Perfil').click()

        cy.get('#name').type('Henrique Braga')
        cy.get('#username').type('henri.braga')
        cy.get('#profile').type('QA')

        cy.contains('button[type=submit]', 'Adicionar Perfil').click()


        cy.contains('table tbody tr', 'pedro.felix')
            .should('be.visible').as('trProfile')

        cy.get('@trProfile')
            .contains('Pedro Felix')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('QA')
            .should('be.visible')
    });

    it('Deve remover um perfil da tabela GitHub', () => {

        const profile = {
            name: 'Henri Felix',
            username: 'henri123',
            prof: 'QA'
        };

        cy.get('#name').type(profile.name);
        cy.get('#username').type(profile.username);
        cy.get('#profile').type(profile.prof);
        cy.contains('button[type=submit]', 'Adicionar Perfil').click();

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('tfProfile');

        cy.get('@tfProfile')
            .find('button[title="Remover perfil"]')
            .click();

        cy.contains('table tbody', profile.username).should('not.exist');

    });

    it('Deve validar o link de perfil do GitHub', () => {
        const profile = {
            name: 'Fernando Papito',
            username: 'papitodev',
            prof: 'QA'
        };

        cy.get('#name').type(profile.name);
        cy.get('#username').type(profile.username);
        cy.get('#profile').type(profile.prof);
        cy.contains('button[type=submit]', 'Adicionar Perfil').click();

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('tfProfile');

        cy.get('@tfProfile')
            .find('a')
            .should('have.attr', 'href', `https://github.com/${profile.username}`)
            .and('have.attr', 'target', '_blank');
    });
});