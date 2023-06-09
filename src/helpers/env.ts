import { ENVIRONMENT } from "./constants";

export const getEnv = (): "dev" | "production" | "local" => {
  const envVar = import.meta.env.VITE_XMTP_ENVIRONMENT;
  if (envVar === "production") {
    return envVar;
  }
  if (envVar === "local") {
    return envVar;
  }
  return "dev";
};

export const isAppEnvDemo = (): boolean => {
  return (
    window.location.hostname.includes(ENVIRONMENT.DEMO) ||
    // Added for E2E testing
    localStorage.getItem(ENVIRONMENT.DEMO) === String(true)
  );
};

export const isAppEnvAlpha = (): boolean => {
  return window.location.hostname.includes("alpha");
};

export const getGoogleTagId = (): string => {
  return import.meta.env.VITE_GOOGLE_TAG_ID ?? "";
};
