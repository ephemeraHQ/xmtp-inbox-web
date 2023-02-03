import React from 'react';
import Address from '../Address';

const props = {
  address: '123 Test'
};

describe('<Address />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Address {...props} />);
  });
});
