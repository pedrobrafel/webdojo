describe('Simulando Mouseover', () => {

    beforeEach(() => {
        cy.loginXpress()
    });

    it('Deve mostrar um texto ao passar o mouse em cima do link instagram - com plugin', () => {

        cy.contains('Isso é Mouseover!').should('not.exist')

        cy.get('[data-cy="instagram-link"]')
            .realHover()//funcao do plugin cypress-real-events

        cy.contains('Isso é Mouseover!').should('exist')

    });
});