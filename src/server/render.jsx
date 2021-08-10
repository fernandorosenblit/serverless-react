/**
 * Server Side Rendering
 */
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Helmet from "react-helmet";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import serialize from "serialize-javascript";

import locales from "locales";
import configureStore from "state/store/configureStore.prod";

import App from "browser/App";
import ConfigContext from "../components/ConfigContext";
import config from "./config";
import html from "./html";
import { getLanguageFromHeader } from "./utils";

/** Whether we're running on a local desktop or on AWS Lambda */
const isLocal = process.env.IS_LOCAL || process.env.IS_OFFLINE;

export default async function render(event) {
  const { store } = configureStore(undefined, true);

  let stats = { main: "index.js", css: "index.css" };
  if (!isLocal) {
    try {
      stats = require("../../dist/stats.json");
    } catch (err) {
      throw new Error("`stats.json` not found");
    }
  }
  const helmet = Helmet.renderStatic();
  const preloadedState = serialize(store.getState());

  const userLocale = getLanguageFromHeader(event.headers["Accept-Language"]);
  const messages = locales[userLocale];

  const content = renderToString(
    <ConfigContext.Provider value={config}>
      <IntlProvider locale={userLocale} messages={messages} defaultLocale="en">
        <Provider store={store}>
          <StaticRouter basename={config.app.URL} location={event.path}>
            <App />
          </StaticRouter>
        </Provider>
      </IntlProvider>
    </ConfigContext.Provider>,
  );
  return html({ stats, content, config, helmet, preloadedState });
}
