import "../globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import React, { useEffect, useState } from "react";
import { initialize } from "../helpers/i18n";
import { datadogRum } from "@datadog/browser-rum";
import { ENVIRONMENT } from "../helpers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inbox from "../pages/inbox";
import Index from "../pages/index";
import Dm from "../pages/dm";

const AppController: React.FC = () => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const initI18n = async () => {
      await initialize();
      setInitialized(true);
    };
    initI18n();
  }, []);

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
        applicationId: import.meta.env.VITE_DATA_DOG_ID as string,
        clientToken: import.meta.env.VITE_DATA_DOG_TOKEN as string,
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

  return initialized ? (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/inbox" element={<Inbox />}></Route>
        <Route path="/dm/:address" element={<Dm />}></Route>
      </Routes>
    </Router>
  ) : null;
};

export default AppController;
