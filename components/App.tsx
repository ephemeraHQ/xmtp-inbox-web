import { useEffect } from "react";
import Layout from "../components/Layout";
import { datadogRum } from "@datadog/browser-rum";
import { ENVIRONMENT } from "../helpers";

type AppProps = {
  children?: React.ReactNode;
};

function App({ children }: AppProps) {
  useEffect(() => {
    /* The initialization below will only happen 
    on our internal testing url (alpha.xmtp.chat)
    and is used for performance testing purposes.
    This tracking is meant to help surface insights 
    about performance based on team usage, and flag
    any performance degradations before they hit our
    production users. */
    if (window.location.hostname.includes(ENVIRONMENT.ALPHA)) {
      datadogRum.init({
        applicationId: process.env.NEXT_PUBLIC_DATA_DOG_ID as string,
        clientToken: process.env.NEXT_PUBLIC_DATA_DOG_TOKEN as string,
        site: "datadoghq.com",
        service: "inbox-web",
        env: "prod",
        sessionSampleRate: 100,
        sessionReplaySampleRate: 0,
        trackUserInteractions: false,
        trackResources: true,
        trackLongTasks: true,
        defaultPrivacyLevel: "mask",
      });

      datadogRum.startSessionReplayRecording();
    }
  }, []);
  return <Layout>{children}</Layout>;
}

export default App;
