import { getAppVersion } from '../appVersion';

jest.mock('../../package.json', () => ({
  name: 'testName',
  version: '1'
}));

describe('getAppVersion', () => {
  it('returns app version and name in package json', () => {
    expect(getAppVersion()).toBe('testName/1');
  });
  // No edge case check here due to those being required fields in a public package.json.
});
