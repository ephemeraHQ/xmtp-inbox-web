// @ts-nocheck
// Required for stub
import React from 'react';
import RecipientControl from '../RecipientControl';
import router from 'next/router';

describe('<RecipientControl />', () => {
  it('renders', () => {
    cy.stub(router, 'useRouter').returns({
      pathname: '/mockedPath',
      query: { recipientWalletAddr: 'testAddress' }
    }); // see: https://on.cypress.io/mounting-react
    cy.mount(<RecipientControl />);
  });
});
