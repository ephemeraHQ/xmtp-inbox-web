// @ts-nocheck
// Required for stub
import React from "react";
import Layout from "../Layout";
import router from "next/router";
import { WagmiConfig } from "wagmi";
import { mockClient, providerChains } from "../../cypress/mock_wagmi_client";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

describe("<Layout />", () => {
  it("renders", () => {
    cy.stub(router, "useRouter").returns({
      useRouter: { pathname: "/mockedPath" },
    });
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <WagmiConfig client={mockClient}>
        <RainbowKitProvider chains={providerChains}>
          <Layout />
        </RainbowKitProvider>
      </WagmiConfig>,
    );
  });
});
