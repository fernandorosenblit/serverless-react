import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import includes from "lodash/includes";
import dayjs from "dayjs";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Fix for browsers that don't implement Intl by default e.g.: Safari)
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/es";

import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "constants/constants";
import configureStore from "state/store/configureStore";
import locales from "locales";
import httpClient from "httpClient";
import applyDefaultInterceptors from "httpClient/applyDefaultInterceptors";
import apiKeyInterceptor from "httpClient/apiKeyInterceptor";

import ConfigContext from "../components/ConfigContext";
import App from "./App";

import "styles/styles.scss";

const config = window.__CONFIG__;
delete window.__CONFIG__;

const basename = config.app.URL.match(/^(?:https?:\/\/)?[^\/]+(\/?.+)?$/i)?.[1];

const usersLocale = navigator.language.split("-")[0];
const supportedUserLocale = includes(SUPPORTED_LANGUAGES, usersLocale);
const locale = supportedUserLocale ? usersLocale : DEFAULT_LANGUAGE;
const messages = locales[locale];
dayjs.locale(locale);

const { persistor, store } = configureStore();

hydrate(
  <ConfigContext.Provider value={config}>
    <BrowserRouter basename={basename}>
      <IntlProvider locale={locale} messages={messages} defaultLocale={DEFAULT_LANGUAGE}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </IntlProvider>
    </BrowserRouter>
  </ConfigContext.Provider>,
  document.querySelector("#root"),
);

applyDefaultInterceptors(store, httpClient);
apiKeyInterceptor(httpClient);
