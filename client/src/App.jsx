import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SearchComponent from './components/search/index';
import Home from './components/Homepage/index';
import NewTicket from './components/NewTicket';
import MainSidebar from './components/MainSidebar';
import OpenedTicket from './components/opened-ticket/index';
import Reports from './components/reports/index';
import './App.css';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <div />} />
      <Route path="/search/pending" render={() => <SearchComponent pendingClass="selected" closedClass="" />} />
      <Route path="/search/closed" render={() => <SearchComponent pendingClass="" closedClass="selected" />} />
      <Route path="/tickets/all/pending" component={() => <Home page="HomeAll" pendingClass="selected" closedClass="" />} />
      <Route path="/tickets/my/pending" component={() => <Home page="HomeMy" pendingClass="selected" closedClass="" />} />
      <Route path="/tickets/all/closed" component={() => <Home page="HomeAll" pendingClass="" closedClass="selected" />} />
      <Route path="/tickets/my/closed" component={() => <Home page="HomeMy" pendingClass="" closedClass="selected" />} />
      <Route path="/tickets/draft" component={() => <Home page="HomeDraft" />} />
      <Route path="/tickets/trash" component={() => <Home page="HomeTrash" />} />
      <Route exact path="/" />
      <Route exact path="/login" component={Login} />
      <Route exact path="/main-sidebar" component={() => <MainSidebar selected="tickets" />} />
      <Route exact path="/new-ticket" component={() => <NewTicket />} />
      <Route exact path="/opened-ticket" component={() => <OpenedTicket subject="Ticket subject" status="Pending" />} />
      <Route exact path="/reports/overall" component={() => <Reports page="overall" subject="Overall" />} />
      <Route exact path="/reports/today" component={() => <Reports page="today" subject="Today" />} />
      <Route exact path="/reports/last-week" component={() => <Reports page="last-week" subject="Last week" />} />
      <Route exact path="/reports/last-month" component={() => <Reports page="last-month" subject="Last month" />} />
    </Switch>
  </BrowserRouter>
);
