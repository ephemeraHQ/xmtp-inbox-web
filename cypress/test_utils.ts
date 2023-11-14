/* eslint-disable cypress/no-unnecessary-waiting */
import { ENVIRONMENT } from "../src/helpers";

export const TIMEOUT = 40000;

export const checkElement = (testId: string) =>
  cy.get(`[data-testid=${testId}]`, { timeout: TIMEOUT }).should("exist");

export const checkMissingElement = (testId: string) =>
  cy.get(`[data-testid=${testId}]`).should("not.exist");

export const checkLink = (testId: string, link: string) =>
  cy.get(`[data-testid=${testId}]`).should("have.attr", "href", link);

export const disconnectWallet = () => {
  checkElement("icon").click();
  checkElement("disconnect-wallet-cta").click();
};

export const startDemoEnv = () => {
  cy.visit(Cypress.env("server_url"));
  localStorage.setItem(ENVIRONMENT.DEMO, String(true));
};

const enterWalletAddress = (testUser: string) => {
  checkElement("message-to-input").type(testUser, { delay: 1 });
};

const checkExpectedPreMessageFields = () => {
  cy.wait(1000);
  checkElement("message-input");
  checkElement("message-input-submit");
};

export const sendMessages = (
  numberOfTimes: number,
  message: string,
  testUser: string,
  differentMessageText: boolean,
) => {
  for (let i = 0; i < numberOfTimes; i++) {
    // Enters message
    checkElement("message-input").type(message, { delay: 1 });
    cy.wait(100);
    checkElement("message-input-submit");
    cy.get(`[data-testid=message-input-submit]`).click();
    cy.wait(1000);
    cy.get(`[data-testid=conversations-list-panel]`, {
      timeout: TIMEOUT,
    }).should("have.length", 1);
  }

  if (differentMessageText) {
    const differentMessage = "differentMessage";
    // Send additional different message, check that different message was returned in correct order
    checkElement("message-input").type(differentMessage, { delay: 1 });
    cy.wait(1000);
    checkElement("message-input-submit");
    cy.get(`[data-testid=message-input-submit]`).click();
  }
};

export const checkMessageOutput = (numberOfTimes: number, message: string) => {
  cy.get(`[data-testid=message-tile-container]`, { timeout: TIMEOUT })
    .children()
    .should("have.length", numberOfTimes || 1);

  cy.get(`[data-testid=message-tile-text]`, { timeout: TIMEOUT })
    .children()
    .last()
    .should("have.text", message);
};

const checkMostRecentMessageOutput = (
  numberOfTimes: number,
  differentMessage: string,
) => {
  cy.get(`[data-testid=message-tile-container]`, { timeout: TIMEOUT })
    .children()
    .should("have.length", numberOfTimes);

  cy.get(`[data-testid=message-tile-text]`, { timeout: TIMEOUT })
    .children()
    .eq(numberOfTimes - 1)
    .should("have.text", differentMessage);
};

export const sendAndEnterMessage = (
  testUser: string,
  message: string,
  numberOfTimes = 1,
  checkDifferentMessages = false,
) => {
  cy.wait(2000);
  checkElement("empty-message-cta");
  cy.get(`[data-testid=empty-message-cta]`).click({ timeout: TIMEOUT });
  enterWalletAddress(testUser);
  checkExpectedPreMessageFields();
  sendMessages(numberOfTimes, message, testUser, checkDifferentMessages);
  if (checkDifferentMessages) {
    const differentMessage = "differentMessage";
    // Send additional different message, check that different message was returned in correct order
    checkMostRecentMessageOutput(numberOfTimes + 1, differentMessage);
  } else {
    checkMessageOutput(numberOfTimes, message);
  }
};
