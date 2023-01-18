import { ENVIRONMENT } from '../helpers';

export const checkElement = (testId: string) => cy.get(`[data-testid=${testId}]`).should('exist');

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
