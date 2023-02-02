import React from 'react';
import { address } from '../Address';
import AddressPill from '../AddressPill';

const props = {
  address: '0x1232131' as address
};

describe('<AddressPill />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddressPill {...props} />);
  });
});
