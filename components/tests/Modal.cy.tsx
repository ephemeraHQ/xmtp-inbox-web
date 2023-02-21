import React from "react";
import { Modal } from "../Modal";

const props = {
  title: "Modal Title",
  show: true,
  children: "",
  onClose: () => {},
};

describe("<Modal />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Modal {...props} />);
  });
});
