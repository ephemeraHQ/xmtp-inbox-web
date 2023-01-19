import { useEffect } from 'react';
import Layout from '../components/Layout';
import { ENVIRONMENT } from '../helpers/constants';

type AppProps = {
  children?: React.ReactNode;
};

function App({ children }: AppProps) {
  useEffect(() => {
    const { hostname } = window.location;
    if (hostname.includes(ENVIRONMENT.DEMO)) {
      window.localStorage.setItem(ENVIRONMENT.DEMO, String(true));
    }
  }, []);

  return <Layout>{children}</Layout>;
}

export default App;
