// @ts-nocheck
// Required for stub
import React from 'react';
import NavigationView from '../NavigationView';
import router from 'next/router';

describe('<NavigationView />', () => {
  it('renders', () => {
    cy.stub(router, 'useRouter').returns({ useRouter: { pathname: '/mockedPath' } });

    // see: https://on.cypress.io/mounting-react
    cy.mount(<NavigationView />);
  });
});
