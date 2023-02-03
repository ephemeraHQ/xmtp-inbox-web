import '@testing-library/jest-dom';
import failOnConsole from 'jest-fail-on-console';
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;

failOnConsole();
