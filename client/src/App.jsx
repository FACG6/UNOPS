import React, { Component } from "react";
<<<<<<< HEAD
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
=======
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Login from "./components/Login";
// import SearchComponent from "./components/search";
// import Home from "./components/Homepage";
// import NewTicket from "./components/NewTicket";
// import MainSidebar from "./components/MainSidebar";
// import WrappedTicket from "./components/WrappedTicket";
// import Replies from "./components/Replies";
import Reply from "./components/parts/Reply";
>>>>>>> 455826c475ad96ea9c2a87e348e622c603079e5d

export default class App extends Component {
  state = {
<<<<<<< HEAD
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
=======
    wrappedTickets: [],
    replies: []
  };

  componentDidMount() {
    this.setState({
      replies: [
        {
          id: 1,
          email: "jamalat@getsMaxListeners.com",
          message:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, "
        },
        {
          id: 2,
          email: "jamalat@getMadxListeners.com",
          message:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, "
        },
        {
          id: 3,
          email: "jamalat@getMaxListeners.com",
          message:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, "
        }
      ],
      wrappedTickets: [
        {
          id: 1,
          email: "jamalat@gmail.com",
          description: "This is a sample ticket with some sample description",
          date: "April 9",
          subject: "subject"
        },
        {
          id: 2,
          email: "jamalat@gmail.com",
          description: "This is a sample ticket with some sample description",
          date: "April 9",
          subject: "subject"
        },
        {
          id: 3,
          email: "jamalat@gmail.com",
          description: "This is a sample ticket with some sample description",
          date: "April 9",
          subject: "subject"
        },
        {
          id: 4,
          email: "jamalat@gmail.com",
          description: "This is a sample ticket with some sample description",
          date: "April 9",
          subject: "subject"
        }
      ]
    });
>>>>>>> 455826c475ad96ea9c2a87e348e622c603079e5d
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
<<<<<<< HEAD
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
=======
    if (this.state.replies) {
      return (
        <BrowserRouter>
          <Switch>
            {/* <Route exact path="/" />
            <Route exact path="/new-ticket" component={NewTicket} />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/main-sidebar"
              component={() => <MainSidebar selected="tickets" />}
            /> */}
            <Route exact path="/ticket" component={() => <Reply />} />
          </Switch>
        </BrowserRouter>
      );
    }
    return <h2>There are no Replies yet.</h2>;
>>>>>>> 455826c475ad96ea9c2a87e348e622c603079e5d
  }
}
