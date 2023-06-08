import { Buffer } from "buffer";
// @ts-ignore
import process from "process/browser";

window.Buffer = window.Buffer ?? Buffer;
window.process = process;
