import Layout from "../components/Layout";
import { isAppEnvAlpha } from "../helpers";

type AppProps = {
  children?: React.ReactNode;
};

function App({ children }: AppProps) {
  if (isAppEnvAlpha()) {
    console.log("In alpha environment");
  }
  return <Layout>{children}</Layout>;
}

export default App;
