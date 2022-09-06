import HeroDetail from './HeroDetail'
import '../styles.scss'
import {Hero} from 'models/Hero'
import React from 'react'

describe('HeroDetail', () => {
  context('handleSave, handleCancel', () => {
    beforeEach(() => {
      cy.window()
        .its('console')
        .then(console => cy.spy(console, 'log').as('log'))

      const hero: Hero = {id: '', name: '', description: ''}
      cy.mount(<HeroDetail hero={hero} />)
    })
    it('should handle Save', () => {
      cy.getByCy('save-button').click()
      cy.get('@log').should('have.been.calledWith', 'handleSave')
    })

    it('should handle Cancel', () => {
      cy.getByCy('cancel-button').click()
      cy.get('@log').should('have.been.calledWith', 'handleCancel')
    })
  })

  context('handleNameChange, handleDescriptionChange', () => {
    beforeEach(() => {
      cy.spy(React, 'useState').as('useState')
      const hero: Hero = {id: '', name: '', description: ''}
      cy.mount(<HeroDetail hero={hero} />)
    })

    it('should handle name change', () => {
      const newHeroName = 'abc'
      cy.getByCy('input-detail-name').type(newHeroName)

      cy.get('@useState').should('have.been.called')
    })

    it('should handle description change', () => {
      const newHeroDescription = '123'
      cy.getByCy('input-detail-description').type(newHeroDescription)
      cy.get('@useState').should('have.been.called')
    })
  })

  context('state: should verify the layout of the component', () => {
    it('id: false, name: false - should verify the minimal state of the component', () => {
      const hero: Hero = {id: '', name: '', description: ''}
      cy.mount(<HeroDetail hero={hero} />)

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
