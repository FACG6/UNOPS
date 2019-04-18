import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import SearchSidebar from "./components/searchSidebar/sidebar";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/search' render={ () => (
          <SearchSidebar /> )} />
        </Switch>
      </Router>
    );
  }
}

export default App;
