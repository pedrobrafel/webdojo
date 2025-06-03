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

Cypress.Commands.add('postUser', (user) => {
  return cy.api({
    method: 'POST',
    url: '/api/users/register',
    body: user,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('getUsers', () => {
  return cy.api({
    method: 'GET',
    url: '/api/users',
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('putUser', (id, user)=>{
  return cy.api({
    method: 'PUT',
    url: '/api/users/' + id,
    body: user,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteUser', (id)=>{
  return cy.api({
    method: 'DELETE',
    url: '/api/users/' + id,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  })
})