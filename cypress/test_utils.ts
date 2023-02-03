/* eslint-disable cypress/no-unnecessary-waiting */
import { ENVIRONMENT } from '../helpers';

export const checkElement = (testId: string) =>
  cy.get(`[data-testid=${testId}]`, { timeout: 10000 }).should('exist');

export const checkMissingElement = (testId: string) => cy.get(`[data-testid=${testId}]`).should('not.exist');

export const checkLink = (testId: string, link: string) =>
  cy.get(`[data-testid=${testId}]`).should('have.attr', 'href', link);

export const disconnectWallet = () => {
  cy.get(`[data-testid="settings-icon"]`).click();
  cy.get(`[data-testid="disconnect-wallet-cta"]`).click();
};

export const startDemoEnv = () => {
  cy.visit('http://localhost:3000');
  localStorage.setItem(ENVIRONMENT.DEMO, String(true));
};

const enterWalletAddress = (testUser: string) => {
  checkElement('message-to-input').type(testUser).click();
};

const checkExpectedPreMessageFields = () => {
  cy.wait(1000);
  checkElement('message-beginning-text');
  checkElement('message-input');
  checkElement('message-input-submit');
};

const sendMessages = (
  numberOfTimes: number,
  message: string,
  testUser: string,
  differentMessageText: boolean
) => {
  console.log(differentMessageText);

  for (let i = 0; i < numberOfTimes; i++) {
    // Enters message
    checkElement('message-input').type(message);
    cy.wait(500);
    checkElement('message-input-submit').click();
    cy.wait(500);
  }

  if (differentMessageText) {
    const differentMessage = 'differentMessage';
    // Send additional different message, check that different message was returned in correct order
    checkElement('message-input').type(differentMessage);
    cy.wait(500);
    checkElement('message-input-submit').click();
    cy.wait(500);
  }

  // A way around to solve the message streaming issue
  cy.wait(2000);
  checkElement('xmtp-logo').click();
  cy.wait(2000);
  checkElement('message-to-input').clear();
  checkElement('message-to-input').type(testUser).click();
  cy.wait(2000);

  // Confirms successful message
  cy.get(`[data-testid=conversations-list-panel]`, { timeout: 10000 }).children().should('have.length', 1);
};

const checkMessageOutput = (numberOfTimes: number, message: string) => {
  cy.get(`[data-testid=message-tile-container]`, { timeout: 10000 })
    .children()
    .should('have.length', numberOfTimes || 1);
  cy.get(`[data-testid=message-tile-text]`, { timeout: 10000 }).last().should('have.text', message);
};

const checkMostRecentMessageOutput = (numberOfTimes: number, differentMessage: string) => {
  cy.get(`[data-testid=message-tile-container]`, { timeout: 10000 })
    .children()
    .should('have.length', numberOfTimes + 1 || 2);

  cy.get(`[data-testid=message-tile-text]`, { timeout: 10000 }).first().should('have.text', differentMessage);
};

export const sendAndEnterMessage = (
  testUser: string,
  message: string,
  numberOfTimes = 1,
  checkDifferentMessages = false
) => {
  enterWalletAddress(testUser);
  checkExpectedPreMessageFields();
  sendMessages(numberOfTimes, message, testUser, checkDifferentMessages);
  if (checkDifferentMessages) {
    const differentMessage = 'differentMessage';
    // Send additional different message, check that different message was returned in correct order
    checkMostRecentMessageOutput(numberOfTimes, differentMessage);
  } else {
    checkMessageOutput(numberOfTimes, message);
  }
};
