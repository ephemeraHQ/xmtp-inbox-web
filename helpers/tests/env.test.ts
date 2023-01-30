import { getEnv, isAppEnvDemo, tagStr } from '../env';
import { ENVIRONMENT } from '../constants';
import { expect } from '@jest/globals';

describe('getEnv', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
  it('returns current process env var for NEXT_PUBLIC_XMTP_ENVIRONMENT if is production', () => {
    process.env.NEXT_PUBLIC_XMTP_ENVIRONMENT = 'production';
    expect(getEnv()).toBe('production');
  });
  it('returns current process env var for NEXT_PUBLIC_XMTP_ENVIRONMENT if is local', () => {
    process.env.NEXT_PUBLIC_XMTP_ENVIRONMENT = 'local';
    expect(getEnv()).toBe('local');
  });
  it('returns dev if current process env var for NEXT_PUBLIC_XMTP_ENVIRONMENT is not production or local', () => {
    process.env.NEXT_PUBLIC_XMTP_ENVIRONMENT = 'not_production_or_local';
    expect(getEnv()).toBe('dev');
  });
  it('returns dev if no current env var can be found', () => {
    process.env.NEXT_PUBLIC_XMTP_ENVIRONMENT = undefined;
    expect(getEnv()).toBe('dev');
  });
});

describe('isAppEnvDemo', () => {
  it('returns false if local storage does not have a key of demo', () => {
    expect(isAppEnvDemo()).toBe(false);
  });
  it('returns true if local storage has a key of demo with value of stringified true', () => {
    window.localStorage.setItem(ENVIRONMENT.DEMO, String(true));
    expect(isAppEnvDemo()).toBe(true);
  });
  it('returns false if local storage has a key of demo with unexpected value', () => {
    window.localStorage.setItem(ENVIRONMENT.DEMO, String(false));
    expect(isAppEnvDemo()).toBe(false);
  });
  it('returns false if hostname does not include demo when empty local storage', () => {
    window.localStorage.clear();
    expect(isAppEnvDemo()).toBe(false);
  });
});

describe('tagStr', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
  it('returns null if getEnv() returns production', () => {
    process.env.NEXT_PUBLIC_XMTP_ENVIRONMENT = 'production';
    expect(tagStr()).toBe(null);
  });
  it('returns uppercased value of getEnv() response if environment is not production', () => {
    process.env.NEXT_PUBLIC_XMTP_ENVIRONMENT = 'local';
    expect(tagStr()).toBe('LOCAL');
    process.env.NEXT_PUBLIC_XMTP_ENVIRONMENT = 'dev';
    expect(tagStr()).toBe('DEV');
    process.env.NEXT_PUBLIC_XMTP_ENVIRONMENT = undefined;
    expect(tagStr()).toBe('DEV');
  });
});
