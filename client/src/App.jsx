import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./components/pages/Login";
import TicketsPage from "./components/pages/TicketsPage";
import NewTicketPage from "./components/pages/NewTicketPage";
import ticketsSample from "./components/model.js";
import "./App.css";
import OpenedTicketPage from "./components/pages/OpenedTicketPage";
import SearchPage from "./components/pages/SearchPage";

export default class App extends Component {
  state = {
    tickets: {
      allTickets: {
        pending: [],
        closed: []
      },
      myTickets: {
        pending: [],
        closed: []
      },
      drafts: [],
      trash: []
    },
    search: {
      query: "",
      user: "",
      status: ""
    },
    searchResults: null
  };

  componentDidMount() {
    this.setState(ticketsSample);
  }

  getTicketByUid = uid => {
    const { tickets } = this.state;
    for (let key in tickets) {
      if (tickets[key] instanceof Array)
        if (tickets[key].find(ticket => ticket.uid === uid))
          return {
            ticket: tickets[key].find(ticket => ticket.uid === uid),
            category: `${key}`
          };
        else continue;
      else {
        for (let statusKey in tickets[key]) {
          if (tickets[key][statusKey].find(ticket => ticket.uid === uid))
            return {
              ticket: tickets[key][statusKey].find(
                ticket => ticket.uid === uid
              ),
              category: `${key}`
            };
          else continue;
        }
      }
    }
  };

  allTicketsCount = () => {
    const { allTickets } = this.state.tickets;
    return allTickets.pending.length + allTickets.closed.length;
  };
  myTicketsCount = () => {
    const { my } = this.state.tickets;
    return my.pending.length + my.closed.length;
  };
  allPendingTicketsCount = () => this.state.tickets.all.pending.length;

  myPendingTicketsCount = () => this.state.tickets.my.pending.length;

  addClosedTicketsCount = () => this.state.tickets.all.closed.length;

  myClosedTicketsCount = () => this.state.tickets.my.closed.length;

  draftsCount = () => this.state.tickets.drafts.length;

  trashCount = () => this.state.tickets.trash.length;

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={() => <Redirect to="/tickets" />} />
          <Route
            exact
            path="/tickets"
            component={() => <Redirect to="/tickets/all-tickets" />}
          />
          <Route
            exact
            path="/tickets/:category"
            component={({
              match: {
                params: { category }
              }
            }) => {
              if (category === "all-tickets" || category === "my-ticekts")
                return <Redirect to={`/tickets/${category}/pending`} />;
              return <Redirect to={`/tickets/${category}`} />;
            }}
          />
          <Route
            exact
            path="/tickets/:category/:status"
            component={props => (
              <TicketsPage {...props} tickets={this.state.tickets} />
            )}
          />
          <Route
            path="/new-ticket"
            component={() => (
              <NewTicketPage
                all={this.allTicketsCount()}
                my={this.myTicketsCount()}
                drafts={this.draftsCount()}
                trash={this.trashCount()}
              />
            )}
          />
          <Route
            path="/ticket/:uid"
            component={({
              match: {
                params: { uid }
              }
            }) => (
              <OpenedTicketPage
                {...this.getTicketByUid(parseInt(uid))}
                all={this.allTicketsCount()}
                my={this.myTicketsCount()}
                drafts={this.draftsCount()}
                trash={this.trashCount()}
              />
            )}
          />
          <Route
            path="/search"
            component={() => (
              <SearchPage
                {...this.state.search}
                searchResults={this.searchResults}
                tickets={this.state.tickets.all.pending}
                pending={this.allPendingTicketsCount()}
                closed={this.addClosedTicketsCount()}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}
