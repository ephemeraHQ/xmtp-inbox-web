// @ts-nocheck
import { buildLocalStorageKey, loadKeys, storeKeys, wipeKeys } from "../keys";

const localStorageMock = (() => {
  const store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("buildLocalStorageKey", () => {
  it("builds correct key based on wallet address", () => {
    expect(buildLocalStorageKey("test123")).toBe("xmtp:dev:keys:test123");
  });
  it("properly handles empty input", () => {
    expect(buildLocalStorageKey("")).toBe("");
  });
});

describe("storeKeys", () => {
  it("sets wallet address to localStorage", () => {
    const walletAddress = "testWalletAddress";
    storeKeys(walletAddress, new Uint8Array(2));
    expect(JSON.stringify(loadKeys(walletAddress))).toBe(
      '{"type":"Buffer","data":[0,0]}',
    );
  });
});

describe("loadKeys", () => {
  it("returns expected value when found in localStorage", () => {
    const walletAddress = "testWalletAddress";
    expect(JSON.stringify(loadKeys(walletAddress))).toBe(
      '{"type":"Buffer","data":[0,0]}',
    );
  });
  it("returns null when wallet address exists but key not found in localStorage", () => {
    const walletAddress = "differentWalletAddress";
    expect(loadKeys(walletAddress)).toBe(null);
  });
  it("handles empty input by returning null", () => {
    expect(loadKeys()).toBe(null);
  });
});

describe("wipeKeys", () => {
  it("removes address key from local storage", () => {
    const walletAddress = "testWalletAddress";
    wipeKeys(walletAddress);
    expect(loadKeys(walletAddress)).toBe(null);
  });
});
