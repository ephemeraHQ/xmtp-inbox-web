import React from "react";
import { WagmiConfig } from "wagmi";
import { mockClient } from "../../cypress/mock_wagmi_client";

import Address, { address } from "../Address";

const props = {
  address: "0x12321321" as address,
};

describe("<Address />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <WagmiConfig client={mockClient}>
        <Address {...props} />
      </WagmiConfig>,
    );
  });
});
