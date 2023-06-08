import { Buffer } from "buffer";
// @ts-ignore
import processPolyfill from "process/browser";

// polyfill Buffer
window.Buffer = window.Buffer ?? Buffer;

// preserve environment variables
const env = window.process && window.process.env;

// polyfill process
window.process = processPolyfill;
// rehydrate environment variables
window.process.env = env;
