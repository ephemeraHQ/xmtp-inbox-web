import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from "react";
import { WagmiConfig } from "wagmi";
import { mockClient, providerChains } from "../../cypress/mock_wagmi_client";
import NavigationPanel from "../NavigationPanel";

const props = {
  onConnect: () => new Cypress.Promise(() => {}),
  isError: false,
};

describe("<NavigationPanel />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <WagmiConfig client={mockClient}>
        <RainbowKitProvider chains={providerChains}>
          <NavigationPanel {...props} />
        </RainbowKitProvider>
      </WagmiConfig>,
    );
  });
});
