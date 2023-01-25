import React from 'react';
import NavigationPanel from '../NavigationPanel';

const props = {
  onConnect: () => new Cypress.Promise(() => {}),
  isError: false
};

describe('<NavigationPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NavigationPanel {...props} />);
  });
});
