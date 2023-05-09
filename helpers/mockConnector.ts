import { MockConnector } from "@wagmi/core/connectors/mock";
import { Wallet } from "ethers/lib";
import { isAppEnvDemo } from "./env";

// mock connector for demos
export const getMockConnector = () => {
  if (typeof window !== "undefined" && isAppEnvDemo()) {
    const storedMockConnector = JSON.parse(
      sessionStorage.getItem("mockConnector") ?? "{}",
    );
    if (!storedMockConnector.connect) {
      const mockWallet = Wallet.createRandom();
      const mockConnector = new MockConnector({
        options: { signer: mockWallet },
      });
      sessionStorage.setItem("mockConnector", JSON.stringify(mockConnector));
      return mockConnector;
    } else {
      return storedMockConnector;
    }
  }
};
