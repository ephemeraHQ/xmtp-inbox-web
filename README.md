# XMTP Inbox web chat app

![Test](https://github.com/xmtp-labs/xmtp-inbox-web/actions/workflows/test.yml/badge.svg)
![Lint](https://github.com/xmtp-labs/xmtp-inbox-web/actions/workflows/lint.yml/badge.svg)
![Build](https://github.com/xmtp-labs/xmtp-inbox-web/actions/workflows/build.yml/badge.svg)

![x-red-sm](https://user-images.githubusercontent.com/510695/163488403-1fb37e86-c673-4b48-954e-8460ae4d4b05.png)

**XMTP Inbox demonstrates core and advanced capabilities of the XMTP client SDK, aiming to showcase effective and innovative ways of building with the XMTP.**

This app is built with React, [Next.js](https://nextjs.org/), and the [XMTP client SDK for JavaScript](https://github.com/xmtp/xmtp-js) (`xmtp-js`).

Use the app to send and receive messages using the XMTP `dev` network environment, with some [important considerations](#considerations).

This app is maintained by [XMTP Labs](https://xmtp.com) and distributed under [MIT License](./LICENSE) for learning about and developing apps built with XMTP (Extensible Message Transport Protocol), the open protocol and network for secure web3 messaging.

You are free to customize and deploy the app.

This app has not undergone a formal security audit.


## Get started


### Configure Infura

_XMTP Inbox comes preconfigured with an Infura ID provided for demonstration purposes. If you plan to fork this repo or host the app yourself, you must use your own Infura ID as detailed here._

Add your Infura ID to `.env.local` in the project's root.

```
NEXT_PUBLIC_INFURA_ID={YOUR_INFURA_ID}
```

If you don't have an Infura ID, you can follow [these instructions](https://blog.infura.io/getting-started-with-infura-28e41844cc89/) to get one.


### Install the package

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.


## Functionality


### Wallet connections

The app uses [`Web3Modal`](https://github.com/Web3Modal/web3modal) to inject a Metamask, Coinbase Wallet, or WalletConnect provider through [`ethers`](https://docs.ethers.io/v5/). Methods for connecting and disconnecting are included in `WalletProvider` alongside the provider, signer, wallet address, and ENS utilities.

To use the app's chat functionality, the connected wallet must provide two signatures:

1. A one-time signature that is used to generate the wallet's private XMTP identity
2. A signature that is used on app start-up to initialize the XMTP message API client with that identity


### Chat conversations

The app uses the `xmtp-js` [Conversations](https://github.com/xmtp/xmtp-js#conversations) abstraction to list the available conversations for a connected wallet and to listen for or create new conversations. For each conversation, the app gets existing messages and listens for or creates new messages. Conversations and messages are kept in a lightweight store and made available through `XmtpProvider`.


### Considerations

Here are some important considerations when working with XMTP Inbox app:

- The app sends and receives messages using the XMTP `dev` network environment. To connect to the `production` network instead, set the following environment variable: `NEXT_PUBLIC_XMTP_ENVIRONMENT=production`.
     - XMTP may occasionally delete messages and keys from the `dev` network, and will provide advance notice in the XMTP Discord community ([request access](https://xmtp.typeform.com/to/yojTJarb?utm_source=docs_home)). The `production` network is configured to store messages indefinitely.
- You can't yet send a message to a wallet address that hasn't used XMTP. The app displays an error when it looks up an address that doesn't have an identity broadcast on the XMTP network.
   - This limitation will soon be resolved by improvements to the `xmtp-js` library that will allow messages to be created and stored for future delivery, even if the recipient hasn't used XMTP yet.
