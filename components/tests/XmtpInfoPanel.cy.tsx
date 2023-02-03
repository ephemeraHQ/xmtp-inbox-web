import React from 'react';
import XmtpInfoPanel from '../XmtpInfoPanel';

describe('<XmtpInfoPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<XmtpInfoPanel />);
  });
});
