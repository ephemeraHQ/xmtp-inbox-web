import React from 'react';
import { address } from '../Address';
import Avatar from '../Avatar';

const props = {
  peerAddress: '0x321312321' as address
};

describe('<Avatar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Avatar {...props} />);
  });
});
