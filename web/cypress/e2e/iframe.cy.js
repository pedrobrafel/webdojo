describe('iFrame', () => {

    it('Deve poder tocar o video no iframe', () => {
        cy.start()
        cy.submitLogin('papito@webdojo.com', 'katana123')

        cy.goTo('Video', 'Video')

        cy.get('iframe[title="Video Player"')
            .should('exist')
            .its('0.contentDocument.body')//função do cypress para obter propriedades do elemento. Nesse caso obtemos o conteudo do iframe
            .then(cy.wrap)//função que permite encadear comandos do cypress
            .as('iframePlayer')//cria um alias para o elemento

        cy.get('@iframePlayer')
            .find('.play-button')
            .click()

        cy.get('@iframePlayer')
            .find('.pause-button')
            .click()
    });
});