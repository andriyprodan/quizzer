import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import CreateQuizPage from "./Pages/CreateQuizPage"

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <h1>Hello, World!</h1>
        </Route>
        <Route path="/create-quiz">
          <CreateQuizPage/>
        </Route>
      </Switch>
    </Router>
  );
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);