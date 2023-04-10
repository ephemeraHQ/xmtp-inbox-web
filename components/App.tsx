import Layout from "../components/Layout";
import { ENVIRONMENT } from "../helpers";

type AppProps = {
  children?: React.ReactNode;
};

function App({ children }: AppProps) {
  if (window.location.hostname.includes(ENVIRONMENT.ALPHA)) {
    console.log("In alpha environment");
  }
  return <Layout>{children}</Layout>;
}

export default App;
