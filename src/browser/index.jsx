/**
 * Client
 */
import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ConfigContext from "../components/ConfigContext";
import App from "./App";

import "./index.css";

const config = window.__CONFIG__;
delete window.__CONFIG__;

const basename = config.app.URL.match(/^(?:https?:\/\/)?[^\/]+(\/?.+)?$/i)?.[1];

hydrate(
  <ConfigContext.Provider value={config}>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </ConfigContext.Provider>,
  document.querySelector("#root"),
);
