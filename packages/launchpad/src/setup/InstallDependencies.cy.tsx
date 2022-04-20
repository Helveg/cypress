import { defaultMessages } from '@cy/i18n'
import InstallDependencies from './InstallDependencies.vue'
import { InstallDependenciesFragmentDoc } from '../generated/graphql-test'

describe('<InstallDependencies />', () => {
  beforeEach(function () {
    cy.clock()
    this.onBack = cy.spy()

    cy.mountFragment(InstallDependenciesFragmentDoc, {
      render: (gqlVal) => {
        return <InstallDependencies gql={gqlVal} backFn={this.onBack}/>
      },
    })
  })

  it('displays package information and links', () => {
    cy.contains('a', 'react-scripts')
    .should('be.visible')
    .and('have.attr', 'href', 'https://www.npmjs.com/package/react-scripts')

    cy.contains('a', 'typescript')
    .should('be.visible')
    .and('have.attr', 'href', 'https://www.npmjs.com/package/typescript')

    cy.percySnapshot()
  })

  it('shows expected actions', () => {
    cy.contains('button', defaultMessages.clipboard.copy).should('be.visible')
    cy.contains('button', defaultMessages.setupPage.step.back).should('be.visible')

    cy.contains('button', defaultMessages.setupPage.step.skip).should('be.visible')
  })

  it('triggers back button callback', function () {
    cy.findByRole('button', {
      name: defaultMessages.setupPage.step.back,
    })
    .should('be.visible')
    .click()
    .then(() => {
      expect(this.onBack).to.have.been.calledOnce
    })
  })
})