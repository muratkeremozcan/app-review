import HeroDetail from './HeroDetail'
import '../styles.scss'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'

describe('HeroDetail', () => {
  context('handleSave, handleCancel', () => {
    beforeEach(() => {
      cy.mount(
        <BrowserRouter>
          <HeroDetail />
        </BrowserRouter>,
      )
    })
    it('should handle Save', () => {
      cy.getByCy('save-button').click()
      // TODO spy on something when the network request is made in the future
    })

    it('should handle Cancel', () => {
      cy.getByCy('cancel-button').click()
      cy.location('pathname').should('eq', '/heroes')
    })
  })

  context('handleNameChange, handleDescriptionChange', () => {
    beforeEach(() => {
      cy.mount(
        <BrowserRouter>
          <HeroDetail />
        </BrowserRouter>,
      )
    })

    it('should handle name change', () => {
      const newHeroName = 'abc'
      cy.getByCy('input-detail-name').type(newHeroName)

      cy.findByDisplayValue(newHeroName).should('be.visible')
    })

    it('should handle description change', () => {
      const newHeroDescription = '123'
      cy.getByCy('input-detail-description').type(newHeroDescription)

      cy.findByDisplayValue(newHeroDescription).should('be.visible')
    })
  })

  context('state: should verify the layout of the component', () => {
    it('id: false, name: false - should verify the minimal state of the component', () => {
      cy.mount(
        <BrowserRouter>
          <HeroDetail />{' '}
        </BrowserRouter>,
      )

      cy.get('p').then($el => cy.wrap($el.text()).should('equal', ''))
      cy.getByCyLike('input-detail').should('have.length', 2)
      cy.getByCy('input-detail-id').should('not.exist')

      cy.findByPlaceholderText('e.g. Colleen').should('be.visible')
      cy.findByPlaceholderText('e.g. dance fight!').should('be.visible')

      cy.getByCy('save-button').should('be.visible')
      cy.getByCy('cancel-button').should('be.visible')
    })
  })
})
