// @ts-nocheck
// Required for stub
import React from 'react';
import RecipientControl from '../RecipientControl';
import router from 'next/router';
import { WagmiConfig } from 'wagmi';
import { mockClient } from '../../../cypress/mock_wagmi_client';

describe('<RecipientControl />', () => {
  it('renders', () => {
    cy.stub(router, 'useRouter').returns({
      pathname: '/mockedPath',
      query: { recipientWalletAddr: 'testAddress' }
    }); // see: https://on.cypress.io/mounting-react
    cy.mount(
      <WagmiConfig client={mockClient}>
        <RecipientControl />
      </WagmiConfig>
    );
  });
});
