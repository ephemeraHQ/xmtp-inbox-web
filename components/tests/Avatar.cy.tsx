import React from 'react';
import Avatar from '../Avatar';

const props = {
  peerAddress: '123 Peer Test'
};

describe('<Avatar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Avatar {...props} />);
  });
});
