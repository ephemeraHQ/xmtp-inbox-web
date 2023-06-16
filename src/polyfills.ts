import { Buffer } from "buffer";

// polyfill Buffer
window.Buffer = window.Buffer ?? Buffer;

// ensure global
window.global = window.global ?? window;
