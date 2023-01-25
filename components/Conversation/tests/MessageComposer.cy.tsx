// @ts-nocheck
// Required for stub
import React from 'react';
import MessageComposer from '../MessageComposer';
import router from 'next/router';

const props = {
  onSend: () => new Cypress.Promise(() => {})
};

describe('<MessageComposer />', () => {
  it('renders', () => {
    cy.stub(router, 'useRouter').returns({
      pathname: '/mockedPath',
      query: { recipientWalletAddr: 'testAddress' }
    });
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MessageComposer {...props} />);
  });
});
