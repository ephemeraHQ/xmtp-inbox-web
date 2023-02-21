import React from "react";
import { WagmiConfig } from "wagmi";
import { mockClient } from "../../cypress/mock_wagmi_client";
import XmtpInfoPanel from "../XmtpInfoPanel";

describe("<XmtpInfoPanel />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <WagmiConfig client={mockClient}>
        <XmtpInfoPanel />
      </WagmiConfig>,
    );
  });
});
