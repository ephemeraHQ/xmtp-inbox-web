import React from "react";
import { Loader, Spinner } from "../Loader";

const loaderProps = {
  subHeadingText: "Loading",
  isLoading: true,
};

const spinnerProps = {
  isLoading: true,
};

describe("<Loader />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Loader {...loaderProps} />);
  });
});

describe("<Spinner />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Spinner {...spinnerProps} />);
  });
});
