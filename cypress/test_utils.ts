import { ENVIRONMENT } from '../helpers';

export const checkElement = (testId: string) =>
  cy.get(`[data-testid=${testId}]`, { timeout: 10000 }).should('exist');

export const checkMissingElement = (testId: string) => cy.get(`[data-testid=${testId}]`).should('not.exist');

export const checkLink = (testId: string, link: string) =>
  cy.get(`[data-testid=${testId}]`).should('have.attr', 'href', link);

export const disconnectWallet = () => {
  cy.get(`[data-testid="settings-icon"]`).last().click();
  cy.get(`[data-testid="disconnect-wallet-cta"]`).click();
};

export const startDemoEnv = () => {
  cy.visit('http://localhost:3000');
  localStorage.setItem(ENVIRONMENT.DEMO, String(true));
};

export const sendAndEnterMessage = (testUser: string, message: string, numberOfTimes = 1) => {
  // Enters wallet address
  checkElement('message-to-input').last().type(testUser).click();

  // Sees expected fields
  checkElement('message-beginning-text');
  checkElement('message-input');
  checkElement('message-input-submit');

  for (let i = 0; i < numberOfTimes; i++) {
    // Enters message
    checkElement('message-input').last().type(message);
    checkElement('message-input-submit').last().click();
  }

  // Confirms successful message
  cy.get(`[data-testid=conversations-list-panel]`, { timeout: 10000 })
    .last()
    .children()
    .should('have.length', 1);
  cy.get(`[data-testid=message-tile-container]`, { timeout: 10000 })
    .last()
    .children()
    .should('have.length', numberOfTimes || 1);
  cy.get(`[data-testid=message-tile-text]`, { timeout: 10000 }).last().should('have.text', message);
};
