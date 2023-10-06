import { Buffer } from "buffer";

// polyfill Buffer
window.Buffer = window.Buffer ?? Buffer;

// ensure global
window.global = window.global ?? window;

// workaround for https://github.com/coinbase/coinbase-wallet-sdk/issues/874
// TODO: remove when https://github.com/coinbase/coinbase-wallet-sdk/pull/940 is released (>3.7.1)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.process = { env: {} };
