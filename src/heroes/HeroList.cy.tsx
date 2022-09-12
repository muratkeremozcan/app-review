import {BrowserRouter} from 'react-router-dom'
import HeroList from './HeroList'
import '../styles.scss'
import heroes from '../../cypress/fixtures/heroes.json'

describe('HeroList', () => {
  beforeEach(() => {
    cy.mount(
      <BrowserRouter>
        <HeroList
          heroes={heroes}
          handleDeleteHero={cy.stub().as('handleDeleteHero')}
        />
      </BrowserRouter>,
    )
  })

  it('should render the hero layout', () => {
    cy.getByCyLike('hero-list-item').should('have.length', heroes.length)

    cy.getByCy('card-content')
    cy.contains(heroes[0].name)
    cy.contains(heroes[0].description)

    cy.get('footer').within(() => {
      cy.getByCy('delete-button')
      cy.getByCy('edit-button')
    })
  })

  it('should search and filter hero by name and description', () => {
    cy.getByCy('search').type(heroes[0].name)
    cy.getByCyLike('hero-list-item')
      .should('have.length', 1)
      .contains(heroes[0].name)

    cy.getByCy('search').clear().type(heroes[2].description)
    cy.getByCyLike('hero-list-item')
      .should('have.length', 1)
      .contains(heroes[2].description)
  })

  context('handleDelete, handleEdit', () => {
    it('should handle delete', () => {
      cy.getByCy('delete-button').first().click()
      cy.get('@handleDeleteHero').should('have.been.called')
    })
    it('should handle edit', () => {
      cy.getByCy('edit-button').first().click()
      cy.location('pathname').should('eq', '/heroes/edit-hero/' + heroes[0].id)
    })
  })
})
