// @ts-nocheck
// Required for stub
import React from 'react';
import NewMessageButton from '../NewMessageButton';
import router from 'next/router';

describe('<NewMessageButton />', () => {
  it('renders', () => {
    cy.stub(router, 'useRouter').returns({ useRouter: { pathname: '/mockedPath' } });
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NewMessageButton />);
  });
});
