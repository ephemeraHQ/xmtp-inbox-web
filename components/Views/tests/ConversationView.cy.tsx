// @ts-nocheck
// Required for stub
import React from 'react';
import ConversationView from '../ConversationView';
import router from 'next/router';

describe('<ConversationView />', () => {
  it('renders', () => {
    cy.stub(router, 'useRouter').returns({ useRouter: { pathname: '/mockedPath' } });
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ConversationView />);
  });
});
