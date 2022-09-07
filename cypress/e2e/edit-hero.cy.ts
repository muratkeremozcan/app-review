describe('Edit hero', () => {
  beforeEach(() => cy.visit('/'))
  it('should go through the cancel flow', () => {
    cy.location('pathname').should('eq', '/heroes')

    cy.fixture('heroes').then(heroes => {
      cy.getByCy('edit-button').eq(0).click()
      cy.location('pathname').should(
        'include',
        `/heroes/edit-hero/${heroes[0].id}`,
      )
      cy.getByCy('hero-detail').should('be.visible')
      cy.getByCy('input-detail-id').should('be.visible')
      cy.findByDisplayValue(heroes[0].id)
      cy.findByDisplayValue(heroes[0].name)
      cy.findByDisplayValue(heroes[0].description)

      cy.getByCy('cancel-button').click()
      cy.location('pathname').should('eq', '/heroes')
      cy.getByCy('hero-list').should('be.visible')
    })
  })

  it('should go through the cancel flow for another hero', () => {
    cy.location('pathname').should('eq', '/heroes')

    cy.fixture('heroes').then(heroes => {
      cy.getByCy('edit-button').eq(1).click()
      cy.location('pathname').should(
        'include',
        `/heroes/edit-hero/${heroes[1].id}`,
      )
      cy.getByCy('hero-detail').should('be.visible')
      cy.getByCy('input-detail-id').should('be.visible')
      cy.findByDisplayValue(heroes[1].id)
      cy.findByDisplayValue(heroes[1].name)
      cy.findByDisplayValue(heroes[1].description)

      cy.getByCy('cancel-button').click()
      cy.location('pathname').should('eq', '/heroes')
      cy.getByCy('hero-list').should('be.visible')
    })
  })
})
