import { startDemoEnv, sendAndEnterMessage } from '../test_utils';

describe('Messaging Test Cases', () => {
  beforeEach(() => {
    startDemoEnv();
  });
  const testUserWithXmtpAccount = '0x78BfD39428C32Be149892d64bEE6C6f90aedEec1';

  const shortMessage = 'hello';
  const longMessage =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et ultrices neque ornare aenean euismod elementum. Etiam tempor orci eu lobortis elementum nibh. Tincidunt ornare massa eget egestas purus. Purus sit amet volutpat consequat mauris. Arcu felis bibendum ut tristique et egestas quis ipsum suspendisse. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Neque ornare aenean euismod elementum nisi quis eleifend.';

  it('Can send a new message to user in XMTP network', () => {
    sendAndEnterMessage(testUserWithXmtpAccount, shortMessage, 2);
  });
  // TODO: Fix test
  it('Can send a long message to user in XMTP network', () => {
    sendAndEnterMessage(testUserWithXmtpAccount, longMessage, 1);
  });

  it('Can send multiple messages to user in XMTP network', () => {
    sendAndEnterMessage(testUserWithXmtpAccount, shortMessage, 6);
  });
});
