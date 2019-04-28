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
import ticketsSample from "./components/model";
import "./App.css";
import OpenedTicketPage from "./components/pages/OpenedTicketPage";
import SearchPage from "./components/pages/SearchPage";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:7425");

export default class App extends Component {
  state = {
    tickets: {
      "all-tickets": {
        pending: [],
        closed: []
      },
      "my-tickets": {
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
    socket.emit("getmails");
    socket.on("mails", data => {
      this.setState({
        tickets: [...this.state.tickets, JSON.parse(data)]
      });
    });
  }

  getTicketByUid = uid => {
    const { tickets } = this.state;
    for (const key in tickets) {
      if (tickets[key] instanceof Array) {
        if (tickets[key].find(ticket => ticket.uid === uid)) {
          return {
            ticket: tickets[key].find(ticket => ticket.uid === uid),
            category: `${key}`
          };
        }
        continue;
      } else {
        for (const statusKey in tickets[key]) {
          if (tickets[key][statusKey].find(ticket => ticket.uid === uid)) {
            return {
              ticket: tickets[key][statusKey].find(
                ticket => ticket.uid === uid
              ),
              category: `${key}`
            };
          }
          continue;
        }
      }
    }
    return undefined;
  };

  allTicketsCount = () => {
    const allTickets = this.state.tickets["all-tickets"];
    return allTickets.pending.length + allTickets.closed.length;
  };

  myTicketsCount = () => {
    const myTickets = this.state.tickets["my-tickets"];
    return myTickets.pending.length + myTickets.closed.length;
  };

  allPendingTicketsCount = () =>
    this.state.tickets["all-tickets"].pending.length;

  myPendingTicketsCount = () => this.state.tickets["my-tickets"].pending.length;

  addClosedTicketsCount = () => this.state.tickets["all-tickets"].closed.length;

  myClosedTicketsCount = () => this.state.tickets["my-tickets"].closed.length;

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
                allTickets={this.allTicketsCount()}
                myTickets={this.myTicketsCount()}
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
                {...this.getTicketByUid(parseInt(uid, 10))}
                allTickets={this.allTicketsCount()}
                myTickets={this.myTicketsCount()}
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
                tickets={this.state.tickets["all-tickets"].pending}
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
