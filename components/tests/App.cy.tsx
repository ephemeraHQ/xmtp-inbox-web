// @ts-nocheck
// Required for stub
import React from 'react';
import App from '../App';
import router from 'next/router';

describe('<App />', () => {
  it('renders', () => {
    cy.stub(router, 'useRouter').returns({ useRouter: { pathname: '/mockedPath' } });
    // see: https://on.cypress.io/mounting-react
    cy.mount(<App />);
  });
});
