// @ts-nocheck
// Required for stub
import React from 'react';
import Layout from '../Layout';
import router from 'next/router';

describe('<Layout />', () => {
  it('renders', () => {
    cy.stub(router, 'useRouter').returns({ useRouter: { pathname: '/mockedPath' } });
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Layout />);
  });
});
