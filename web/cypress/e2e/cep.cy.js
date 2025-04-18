import address from '../fixtures/cep.json'

describe('CEP', () => {
    beforeEach(() => {
        cy.loginXpress();
        cy.goTo('Integração', 'Consulta de CEP');
    });

    it('Deve validar a consulta de CEP', () => {

        cy.intercept('GET', `https://viacep.com.br/ws/${address.cep}/json`).as('getCEP');

        cy.get('#cep').type(address.cep);

        cy.contains('button', 'Buscar').click();

        cy.wait('@getCEP').then((inteception)=>{
            expect(inteception.response.statusCode).to.eq(200)
        });


        cy.get('#street')
            .should('have.value', address.street);

        cy.get('#neighborhood')
            .should('have.value', address.neighborhood);

        cy.get('#city')
            .should('have.value', address.city);

        cy.get('#state')
            .should('have.value', address.state);
    });
});