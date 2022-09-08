// cypress/e2e/create-hero.cy.ts
describe('Create hero', () => {
  it('should go through the refresh flow', () => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`).as('getHeroes')
    cy.visit('/')
    cy.wait('@getHeroes')
    cy.location('pathname').should('eq', '/heroes')

    cy.getByCy('add-button').click()
    cy.location('pathname').should('eq', '/heroes/add-hero')
    cy.getByCy('hero-detail').should('be.visible')
    cy.getByCy('input-detail-id').should('not.exist')

    cy.getByCy('refresh-button').click()
    cy.location('pathname').should('eq', '/heroes')
    cy.getByCy('hero-list').should('be.visible')
  })

  it('should go through the cancel flow and perform direct navigation', () => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`).as('getHeroes')
    cy.visit('/heroes/add-hero')
    cy.wait('@getHeroes')

    cy.getByCy('cancel-button').click()
    cy.location('pathname').should('eq', '/heroes')
    cy.getByCy('hero-list').should('be.visible')
  })
})
