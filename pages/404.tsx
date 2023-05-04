import type { NextPage } from "next";
import { ErrorPage } from "../component-library/pages/ErrorPage/ErrorPage";

const CustomError: NextPage = () => {
  // Just use default copy for each of these values
  return <ErrorPage header={""} description={""} subtext={""} />;
};

export default CustomError;
