describe('login', () => {
  it('passes', () => {
    cy.visit('/login')
    cy.get('input#username').type(Cypress.env('lUsername'))
    cy.get('input#password').type(Cypress.env('lPassword'))
    cy.get('#btn-login').click()
  })
})