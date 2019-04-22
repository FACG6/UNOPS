import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SearchComponent from './components/search/index';
import Home from './components/Homepage/index';
import NewTicket from './components/NewTicket';
import MainSidebar from './components/MainSidebar';
import OpenedTicket from './components/opened-ticket/index';
import Reports from './components/reports/index';
import './App.css';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={() => <div />} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/main-sidebar" component={() => <MainSidebar selected="tickets" />} />
      <Route exact path="/new-ticket" component={NewTicket} />
      <Route path="/tickets/:cat/:status" component={Home} />
      <Route
        path="/search/pending"
        render={() => <SearchComponent pendingClass="selected" closedClass="" />}
      />
      <Route
        path="/search/closed"
        component={() => <SearchComponent pendingClass="" closedClass="selected" />}
      />
      <Route
        exact
        path="/opened-ticket"
        component={() => <OpenedTicket subject="Ticket subject" status="Pending" />}
      />
      <Route
        exact
        path="/reports/overall"
        component={() => <Reports page="overall" subject="Overall" />}
      />
      <Route
        exact
        path="/reports/today"
        component={() => <Reports page="today" subject="Today" />}
      />
      <Route
        exact
        path="/reports/last-week"
        component={() => <Reports page="last-week" subject="Last week" />}
      />
      <Route
        exact
        path="/reports/last-month"
        component={() => <Reports page="last-month" subject="Last month" />}
      />
    </Switch>
  </Router>
);
