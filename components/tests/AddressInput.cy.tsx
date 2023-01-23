import React from 'react';
import AddressInput from '../AddressInput';

describe('<AddressInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddressInput />);
  });
});
