import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import includes from "lodash/includes";
import dayjs from "dayjs";

// Fix for browsers that don't implement Intl by default e.g.: Safari)
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/locale-data/en";
import "@formatjs/intl-relativetimeformat/locale-data/es";

import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "constants/constants";
import locales from "locales";

import ConfigContext from "../components/ConfigContext";
import App from "./App";

import "./index.css";

const config = window.__CONFIG__;
delete window.__CONFIG__;

const basename = config.app.URL.match(/^(?:https?:\/\/)?[^\/]+(\/?.+)?$/i)?.[1];

const usersLocale = navigator.language.split("-")[0];
const supportedUserLocale = includes(SUPPORTED_LANGUAGES, usersLocale);
const locale = supportedUserLocale ? usersLocale : DEFAULT_LANGUAGE;
const messages = locales[locale];
dayjs.locale(locale);

hydrate(
  <ConfigContext.Provider value={config}>
    <BrowserRouter basename={basename}>
      <IntlProvider locale={locale} messages={messages} defaultLocale={DEFAULT_LANGUAGE}>
        <App />
      </IntlProvider>
    </BrowserRouter>
  </ConfigContext.Provider>,
  document.querySelector("#root"),
);
