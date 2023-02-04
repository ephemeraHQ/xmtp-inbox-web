import React from 'react';
import { WagmiConfig } from 'wagmi';
import AddressInput from '../AddressInput';
import { mockClient } from '../../cypress/mock_wagmi_client';

describe('<AddressInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <WagmiConfig client={mockClient}>
        <AddressInput />
      </WagmiConfig>
    );
  });
});
