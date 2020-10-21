import React from "react";
import "./App.css";
import LoginScr from "./pages/loginScr";
import HomeScr from "./pages/homeScr";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginScr} />
        <Route path="/home/:currentUser" component={HomeScr} />
      </Switch>
    </Router>
  );
}

export default App;
