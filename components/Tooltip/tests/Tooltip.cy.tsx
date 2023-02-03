import React from 'react';
import { Tooltip } from '../Tooltip';

const props = {
  message: 'Tooltip',
  children: ''
};

describe('<Tooltip />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Tooltip {...props} />);
  });
});
