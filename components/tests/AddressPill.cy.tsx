import React from 'react';
import AddressPill from '../AddressPill';

const props = {
  address: '123 Test'
};

describe('<AddressPill />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddressPill {...props} />);
  });
});
