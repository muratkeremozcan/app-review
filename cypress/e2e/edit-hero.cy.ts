describe('Edit hero', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('API_URL')}/heroes`).as('getHeroes')
    cy.visit('/')
    cy.wait('@getHeroes')
    cy.location('pathname').should('eq', '/heroes')
  })
  it('should go through the cancel flow', () => {
    cy.fixture('heroes').then(heroes => {
      cy.getByCy('edit-button').eq(0).click()
      cy.location('pathname').should(
        'include',
        `/heroes/edit-hero/${heroes[0].id}`,
      )
      cy.getByCy('hero-detail').should('be.visible')
      cy.getByCy('input-detail-id').should('be.visible')
      cy.findByDisplayValue(heroes[0].id).should('be.visible')
      cy.findByDisplayValue(heroes[0].name).should('be.visible')
      cy.findByDisplayValue(heroes[0].description).should('be.visible')

      cy.getByCy('cancel-button').click()
      cy.location('pathname').should('eq', '/heroes')
      cy.getByCy('hero-list').should('be.visible')
    })
  })

  it('should go through the cancel flow for another hero', () => {
    cy.fixture('heroes').then(heroes => {
      cy.getByCy('edit-button').eq(1).click()
      cy.location('pathname').should(
        'include',
        `/heroes/edit-hero/${heroes[1].id}`,
      )
      cy.getByCy('hero-detail').should('be.visible')
      cy.getByCy('input-detail-id').should('be.visible')
      cy.findByDisplayValue(heroes[1].id).should('be.visible')
      cy.findByDisplayValue(heroes[1].name).should('be.visible')
      cy.findByDisplayValue(heroes[1].description).should('be.visible')

      cy.getByCy('cancel-button').click()
      cy.location('pathname').should('eq', '/heroes')
      cy.getByCy('hero-list').should('be.visible')
    })
  })

  it('should navigate to add from an existing hero', () => {
    cy.fixture('heroes').then(heroes => {
      cy.getByCy('edit-button').eq(1).click()

      cy.getByCy('add-button').click()
      cy.getByCy('input-detail-id').should('not.exist')
      cy.findByDisplayValue(heroes[1].name).should('not.exist')
      cy.findByDisplayValue(heroes[1].description).should('not.exist')
    })
  })
})
