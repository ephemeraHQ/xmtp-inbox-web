import React from "react";
import { WagmiConfig } from "wagmi";
import { mockClient } from "../../cypress/mock_wagmi_client";
import UserMenu from "../UserMenu";

const props = {
  isError: false,
};

describe("<UserMenu />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <WagmiConfig client={mockClient}>
        <UserMenu {...props} />
      </WagmiConfig>,
    );
  });
});
