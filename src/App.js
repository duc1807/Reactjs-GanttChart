//@ts-ignore
import React from "react";
import "./App.css";
//@ts-ignore
import LoginScr from "./containers/loginScr.js";
//@ts-ignore
import HomeScr from "./containers/homeScr.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginScr} />
        <Route path="/gantt-chart/:currentUser" exact component={HomeScr} />
      </Switch>
    </Router>
  );
}

export default App;
