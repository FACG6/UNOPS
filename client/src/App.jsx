import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SearchComponent from './components/search';
import Home from './components/Homepage';
import NewTicket from './components/NewTicket';
import MainSidebar from './components/parts/MainSidebar';
import WrappedTicket from './components/WrappedTicket';
import Replies from './components/Replies';
import TicketsSidebar from './components/parts/TicketsSidebar';

class App extends Component {
  state = {
    wrappedTickets: [],
    replies: [],
  };

  componentDidMount() {}

  render() {
    if (this.state.replies) {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" />
            <Route exact path="/new-ticket" component={NewTicket} />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/main-sidebar"
              component={() => <MainSidebar selected="tickets" />}
            />
            <Route
              exact
              path="/ticket"
              component={() => <Replies replies={this.state.replies} />}
            />
            <Route
              exact
              path="/tickets-sidebar"
              component={() => (
                <React.Fragment>
                  <MainSidebar selected="tickets" />
                  <TicketsSidebar selected="all" all={5} my={4} drafts={3} trash={9} />
                </React.Fragment>
              )}
            />
          </Switch>
        </BrowserRouter>
      );
    }
    return <h2>There are no Replies yet.</h2>;
  }
}
export default App;
