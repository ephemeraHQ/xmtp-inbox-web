import { checkElement, checkMissingElement, checkLink, disconnectWallet, startDemoEnv } from '../test_utils';

describe('Connected Test Cases', () => {
  beforeEach(() => {
    startDemoEnv();
    // In connected flow, empty message should render before any tests run
    checkElement('empty-message-header');
  });
  it('Shows expected left panel fields when logged in with a connected wallet and no existing messages', () => {
    const elements = [
      'xmtp-logo',
      'new-message-cta',
      'empty-message-icon',
      'empty-message-header',
      'empty-message-subheader',
      'connected-footer-primary-text',
      'connected-footer-secondary-text',
      'connected-footer-image',
      'settings-icon'
    ];

    elements.forEach((element) => checkElement(element));
  });
  it('Shows expected right panel fields when logged in with a connected wallet and no existing messages', () => {
    checkElement('message-to-key');
    checkElement('message-to-subtext');
  });
  it('Shows expected fields when clicking on settings icon while connected', () => {
    cy.get(`[data-testid="settings-icon"]`).last().click();

    const elements = ['xmtp-version', 'copy-address-cta', 'disconnect-wallet-cta'];
    elements.forEach((element) => checkElement(element));

    cy.get(`[data-testid="disconnect-wallet-cta"]`).click();
    checkElement('no-wallet-connected-header');
  });
  it('Connects to wallet from 4 different entry points', () => {
    disconnectWallet();
    const entryPoints = [
      'no-wallet-connected-cta',
      'settings-icon',
      'connect-section-link',
      'no-wallet-connected-footer-secondary-text'
    ];

    entryPoints.forEach((cta) => {
      checkMissingElement('empty-message-header');
      cy.get(`[data-testid=${cta}]`).last().click();
      checkElement('empty-message-header');
      cy.get(`[data-testid="settings-icon"]`).last().click();
      cy.get(`[data-testid="disconnect-wallet-cta"]`).click();
      checkElement('no-wallet-connected-header');
    });
  });
});

describe('Disconnected Test Cases', () => {
  beforeEach(() => {
    startDemoEnv();
    checkElement('empty-message-header');
    disconnectWallet();
  });
  it('Shows expected left panel fields when disconnected from a wallet', () => {
    const elements = [
      'xmtp-logo',
      'no-wallet-connected-icon',
      'no-wallet-connected-header',
      'no-wallet-connected-subheader',
      'no-wallet-connected-cta',
      'no-wallet-connected-footer-primary-text',
      'no-wallet-connected-footer-secondary-text',
      'settings-icon'
    ];

    elements.forEach((element) => checkElement(element));
  });
  it('Shows expected right panel fields when disconnected from a wallet', () => {
    const elements = [
      'get-started-header',
      'get-started-subheader',
      'connect-icon',
      'connect-header',
      'connect-subheader',
      'connect-arrow',
      'docs-icon',
      'docs-header',
      'docs-subheader',
      'docs-arrow',
      'community-icon',
      'community-header',
      'community-subheader',
      'community-arrow',
      'xmtp-version',
      'help-cta'
    ];
    elements.forEach((element) => checkElement(element));
  });
  it('Directs user to expected links', () => {
    const elementsWithCtas = [
      {
        testId: 'docs-section-link',
        link: 'https://docs.xmtp.org'
      },
      {
        testId: 'community-section-link',
        link: 'https://community.xmtp.org'
      },
      {
        testId: 'help-cta',
        link: 'https://blog.xmtp.com/contact/'
      }
    ];
    elementsWithCtas.forEach((element) => checkLink(element.testId, element.link));
  });
});
