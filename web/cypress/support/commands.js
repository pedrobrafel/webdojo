// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-real-events'
import './actions/consultancy.actions'

Cypress.Commands.add('start', () => {
    cy.visit('/')
})

Cypress.Commands.add('submitLogin', (email, senha) => {
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('shouldHaveAlert', (alerta) => {
    cy.contains('div.title', alerta)
        .should('be.visible')
})

Cypress.Commands.add('goTo', (buttonName, pageTitle) => {
    cy.contains('button', buttonName)
        .should('be.visible')
        .click()

    cy.contains('h1', pageTitle)
        .should('be.visible')

})

function getToday() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
  }

Cypress.Commands.add('loginXpress', ()=>{
    // login atraves de injecao de cookie e token 
    const token = 'e1033d63a53fe66c0fd3451c7fd8f617';
    const loginDate = getToday();

    // injetar cookie
    cy.setCookie('login_date', loginDate);

    // url de dentro do sistema
    cy.visit('/dashboard', {
        //Mas antes de acessar a pagina, eu vou definir esse token do usuario autenticado
        onBeforeLoad(win){
            win.localStorage.setItem('token', token);
        }
    })
})