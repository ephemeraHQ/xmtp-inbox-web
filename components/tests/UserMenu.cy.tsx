import React from 'react';
import UserMenu from '../UserMenu';

const props = {
  isError: false
};

describe('<UserMenu />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UserMenu {...props} />);
  });
});
