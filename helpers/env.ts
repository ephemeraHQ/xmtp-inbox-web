export const getEnv = (): 'dev' | 'production' | 'local' => {
  const envVar = process.env.NEXT_PUBLIC_XMTP_ENVIRONMENT;
  if (envVar === 'production') {
    return envVar;
  }
  if (envVar === 'local') {
    return envVar;
  }
  return 'dev';
};

export const isAppEnvDemo = (): boolean => {
  const { pathname } = window.location;
  const demoEnv = 'demo';
  // Keeping for backwards compatiblity
  // Tracked in issue #21 to remove when no longer needed
  return process.env.NEXT_PUBLIC_APP_ENVIRONMENT === demoEnv || pathname.startsWith(`/${demoEnv}`);
};

export const tagStr = (): string | null => {
  return getEnv() === 'production' ? null : getEnv().toLocaleUpperCase();
};
