import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";

import "browser/App.css";

const labels = {
  test: { id: "password.presence" },
};

export default function App() {
  const intl = useIntl();

  return (
    <div>
      <Helmet>
        <title>Helmet test</title>
      </Helmet>
      <ul>
        <li>
          <NavLink to="/">{intl.formatMessage(labels.test)}</NavLink>
        </li>
        <li>
          <NavLink to="/test">Test</NavLink>
        </li>
      </ul>
      <Switch>
        <Route path="/test">
          <h1>Test page</h1>
        </Route>
        <Route path="/">
          <h1>Home page</h1>
        </Route>
      </Switch>
    </div>
  );
}
