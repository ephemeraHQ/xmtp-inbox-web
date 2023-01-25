import React from 'react';
import BackArrow from '../BackArrow';

const props = {
  onClick: () => {}
};

describe('<BackArrow />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BackArrow {...props} />);
  });
});
