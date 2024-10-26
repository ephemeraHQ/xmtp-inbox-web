# Aurora: Next-gen web3 and AI Messaging

![AuroraIcon](https://github.com/user-attachments/assets/dd38329d-23e7-4e90-81d6-9465177f1a0d)

**Aurora is a web3-based messaging application with integrated AI capabilities, built on top of the XMTP protocol.**

Aurora is developed by FrostWire, a team of two undergraduate students participating in their first blockchain-based hackathon. The app is built with React and the [XMTP client SDK for JavaScript](https://github.com/xmtp/xmtp-js) (`xmtp-js`).

This project is a fork of the XMTP Inbox web chat app, customized and enhanced to include AI features. It demonstrates both core and advanced capabilities of the XMTP client SDK while showcasing innovative ways of building with XMTP and AI.

## Quick Links

- **Website**: [aurorawire.vercel.app](https://aurorawire.vercel.app)
- **Ethereum Address**: aurorachat.eth

## Get started

### Configure Infura

Aurora uses Infura to enable wallet apps to connect to the Ethereum blockchain.

Add your Infura API key to `.env.local` at the root of the project:

```
INFURA_ID={YOUR_INFURA_API_KEY}
```

To learn how to create an Infura API key, see [Getting started](https://docs.infura.io/infura/getting-started) in the Infura docs.

### Install the package

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the app.

## Functionality

Aurora combines the power of web3 messaging with AI capabilities:

1. Secure, decentralized messaging using the XMTP protocol
2. AI-assisted conversations
3. Web3 wallet integration for user authentication

### Generative AI. Now in your messages.

You can now directly chat with the world's bleeding edge generative AI models, right in your messages. Want to appear more professional to your boss? Use the "Tone" setting to sound like a senior executive. Want to sound sad but can't care less? Use the "Tone" setting to sound like a depressed teenager. You can even use it to write your messages for you, if you're too lazy to do it yourself.

### Network environment

By default, the app code in this repo is set to send and receive messages using the XMTP `dev` network environment. Use the `XMTP_ENVIRONMENT` variable to change the network the app uses. Other available network environments include `production` and `local`.

XMTP may occasionally delete messages and keys from the `dev` network, and will provide advance notice in the [XMTP Discord community](https://discord.gg/xmtp). The `production` network is configured to store messages indefinitely.

XMTP Labs hosts the following deployments of the XMTP Inbox chat app:

- https://dev.xmtp.chat/ on the `dev` network
- https://xmtp.chat/ on the `production` network

### Wallet connections

Aurora uses [RainbowKit](https://www.rainbowkit.com/) to enable users to connect a Coinbase Wallet, MetaMask, Rainbow, Trust Wallet, or WalletConnect-compatible wallet app.

> **Note**  
> As of WalletConnect v2, a project id is required. This is currently hardcoded with a placeholder value, but if you'd like to use WalletConnect, you can [generate your own](https://www.rainbowkit.com/docs/migration-guide#2-supply-a-walletconnect-cloud-projectid) and edit the placeholder value in `main.tsx`.

Aurora also uses a [viem Account](https://viem.sh/docs/accounts/privateKey.html) interface to sign transactions and messages with a given private key. The XMTP message API client needs this Account to enable and sign messages that create and enable their XMTP identity. This XMTP identity is what enables a user to send and receive messages.

Specifically, the user must provide two signatures using their connected blockchain account:

1. A one-time signature that is used to generate the account's private XMTP identity
2. A signature that is used on app startup to enable, or initialize, the XMTP message API client with that identity

### Chat conversations

Aurora uses the `xmtp-js` [Conversations](https://github.com/xmtp/xmtp-js#conversations) abstraction to list the available conversations for a connected wallet and to listen for or create new conversations. For each conversation, the app gets existing messages and listens for or creates new messages. Conversations and messages are kept in a lightweight store and made available through `XmtpProvider`.

### Accessibility

Aurora is built with Web Content Accessibility Guidelines (WCAG) AA compliance guidelines in mind.

To learn more about WCAG and building accessible web apps, see [WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/).

### Localization

Aurora supports localization in English, Hindi and Chinese currently. If you'd like to contribute a translation of XMTP Inbox UI text, use the existing JSON files in the [`locales` folder](locales) as a starting point. Then, add your translated JSON file to the `locales` folder.

### Tests

Tests will be run with any pull request. To run tests locally, you may use the following commands:

Unit tests:

```bash
npm run test
```

End-to-end Cypress tests:

```bash
npm run e2e:headless
```

Component tests:

```bash
npm run cypress:component
```

### Considerations

You can't use an app built with XMTP to send a message to a blockchain account address that hasn't used XMTP. This app displays an error when it looks up an address that doesn't have an identity already registered on the XMTP network.
