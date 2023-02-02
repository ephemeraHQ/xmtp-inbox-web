import React from 'react';
import Address, { address } from '../Address';

const props = {
  address: '0x12321321' as address
};

describe('<Address />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Address {...props} />);
  });
});
