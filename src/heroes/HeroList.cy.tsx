// src/heroes/HeroList.cy.tsx
import HeroList from './HeroList'
import '../styles.scss'
import heroes from '../../cypress/fixtures/heroes.json'

describe('HeroList', () => {
  it('should render the item layout', () => {
    cy.mount(<HeroList heroes={heroes} />)

    cy.getByCyLike('hero-list-item').should('have.length', heroes.length)

    cy.getByCy('card-content')
    cy.contains(heroes[0].name)
    cy.contains(heroes[0].description)

    cy.get('footer').within(() => {
      cy.getByCy('delete-button')
      cy.getByCy('edit-button')
    })
  })

  context('handleDelete, handleEdit', () => {
    beforeEach(() => {
      cy.window()
        .its('console')
        .then(console => cy.spy(console, 'log').as('log'))

      cy.mount(<HeroList heroes={heroes} />)
    })
    it('should handleDeleteHero', () => {
      cy.getByCy('delete-button').first().click()
      cy.get('@log').should('have.been.calledWith', 'handleDeleteHero')
    })
    it('should handleSelectHero', () => {
      cy.getByCy('edit-button').first().click()
      cy.get('@log').should('have.been.calledWith', 'handleSelectHero')
    })
  })
})
