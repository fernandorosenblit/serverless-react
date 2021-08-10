/**
 * Server Side Rendering
 */
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Helmet from "react-helmet";
import ConfigContext from "../components/ConfigContext";
import App from "../browser/App";
import config from "./config";
import html from "./html";

/** Whether we're running on a local desktop or on AWS Lambda */
const isLocal = process.env.IS_LOCAL || process.env.IS_OFFLINE;

export default async function render(event) {
  let stats = { main: "index.js", css: "index.css" };
  if (!isLocal) {
    try {
      stats = require("../../dist/stats.json");
    } catch (err) {
      throw new Error("`stats.json` not found");
    }
  }
  const helmet = Helmet.renderStatic();

  const content = renderToString(
    <ConfigContext.Provider value={config}>
      <StaticRouter basename={config.app.URL} location={event.path}>
        <App />
      </StaticRouter>
    </ConfigContext.Provider>,
  );
  return html({ stats, content, config, helmet });
}
