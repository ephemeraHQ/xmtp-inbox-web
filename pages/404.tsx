import type { NextPage } from "next";
import { ErrorPage } from "../component-library/pages/ErrorPage/ErrorPage";

const CustomError: NextPage = () => {
  // To not show error page in case of dm route
  if (window.location.href.includes("/dm")) {
    return <div />;
  }

  // Just use default copy for each of these values
  return <ErrorPage header={""} description={""} subtext={""} />;
};

export default CustomError;
