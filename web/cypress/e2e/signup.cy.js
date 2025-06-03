
import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Cadastro', () => {
    beforeEach(() => {
        cy.goToSignup()

        cy.intercept('POST', '/api/users/register', {
            statusCode: 201,
            body: {
                message: 'Usuário cadastrado com sucesso'
            }
        }).as('postSignup');
    });

    it('Deve cadastrar um novo usuário', () => {
        cy.get('#name').type('Pedro Felix');
        cy.get('#email').type('pedro@webdojo.com');
        cy.get('#password').type('pedro123');

        cy.contains('button', 'Criar conta').click();

        cy.contains('Conta criada com sucesso')
            .should('be.visible');
    });

    // Essa estrategia pode ser usada para gerar carga de dados para teste
    // a função times do lodash executa um loop, de acordo com o parametro de execução (ex: 5x)
    _.times(5, () => {
        it.only('Deve realizar uma carga de dados fakes', () => {

            const name = faker.person.fullName();
            const email = faker.internet.email();
            const password = 'pwd123';

            cy.get('#name').type(name)
            cy.get('#email').type(email)
            cy.get('#password').type(password)

            cy.contains('button', 'Criar conta').click();
            cy.wait('@postSignup');
            cy.contains('Conta criada com sucesso!');
        })

    });
});