describe('Formulário de Consultoria', () => {
    beforeEach(() => {
        cy.start()
        cy.submitLogin('papito@webdojo.com', 'katana123')
    });

    it('Deve solicitar consultoria individual', () => {
        cy.goTo('Formulários', 'Consultoria')

        cy.get('input[placeholder="Digite seu nome completo"]')
            .type('Pedro Felix')

        cy.get('input[placeholder="Digite seu email"]')
            .type('pedro@wedojo.com')

        cy.contains('label', 'Telefone')
            .parent()
            .find('input')
            .type('35991890635')
            .should('have.value', '(35) 99189-0635')

        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('111.685.616-63')

        const dicoveryChannels = ['Instagram', 'LinkedIn', 'Udemy', 'YouTube', 'Indicação de Amigo']

        dicoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')
        })

        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/document.pdf', { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(`Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed elit massa, rutrum non commodo nec, blandit vitae metus.\nSed id diam egestas, mollis dui a, tempor sapien.`)


        const techs = ['Cypress', 'Selenium', 'WebDriver IO', 'Playwright', 'Robot Framework']

        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(`${tech}{enter}`)

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal', {timeout: 7000})
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    });

    it('Deve verificar os campos obrigatórios', () => {
        cy.goTo('Formulários', 'Consultoria')
        cy.contains('button', 'Enviar formulário')
            .click()

        cy.contains('label', 'Nome Completo')
            .parent()
            .find('p')
            .should('be.visible')
            .and('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'Email')
            .parent()
            .find('p')
            .should('be.visible')
            .and('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'termos de uso')
            .parent()
            .find('p')
            .should('be.visible')
            .and('have.text', 'Você precisa aceitar os termos de uso')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')
    });
});