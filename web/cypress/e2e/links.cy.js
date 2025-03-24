describe('Links abrindo nova guia/aba', () => {
    beforeEach(() => {
        cy.start();
        cy.submitLogin('papito@webdojo.com', 'katana123')
    });

    it('Validando o atributo do link do Instagram', () => {
        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'target', '_blank')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
    });

    it('Acessa link de termos de uso removendo o: target blank', () => {
        cy.goTo('Formulários', 'Consultoria')

        cy.contains('a', 'termos de uso')
            .invoke('removeAttr', 'target')
            .click()

            cy.contains('Termos de Uso').should('be.visible')

    });
});