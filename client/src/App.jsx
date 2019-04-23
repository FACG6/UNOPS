import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainSidebar from './components/parts/MainSidebar';
import TicketsSidebar from './components/parts/TicketsSidebar';
import SearchSidebar from './components/parts/SearchSidebar';
import Navbar from './components/parts/Navbar';
import WrappedTicket from './components/parts/WrappedTicket';
import './App.css';
export default class App extends Component {
  state = {
    tickets: {
      all: [],
      drafts: [],
      trash: [],
    },
    search: {
      query: '',
      user: '',
      status: '',
    },
    newTicket: {
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: '',
      send: false,
    },
  };

  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <React.Fragment>
                <Navbar selected="pending" pending="15" closed="35" currentCat="all" />
                <MainSidebar selected="tickets" />
                <TicketsSidebar selected="all" all={15} my={11} drafts={3} trash={1} />
                <main
                  style={{
                    width: 'calc(100% - 280px)',
                    height: '100%',
                    position: 'fixed',
                    right: '0',
                    top: '50px',
                    padding: '50px',
                    overflowY: 'auto',
                  }}
                >
                  <WrappedTicket
                    from="ahmedisam9922@gmail.com"
                    subject="Subject"
                    description="This is a sample ticket with a sample description"
                    date="April 09"
                  />
                </main>
              </React.Fragment>
            )}
          />
          <Route
            exact
            path="/ticket"
            component={() => (
              <React.Fragment>
                <MainSidebar selected="tickets" />
                <TicketsSidebar selected="all" all={15} my={11} drafts={3} trash={1} />
                <main
                  style={{
                    width: 'calc(100% - 280px)',
                    height: '100%',
                    position: 'fixed',
                    right: '0',
                    top: '50px',
                    padding: '50px',
                    overflowY: 'auto',
                  }}
                >
                  <WrappedTicket
                    from="ahmedisam9922@gmail.com"
                    subject="Subject"
                    description="This is a sample ticket with a sample description"
                    date="April 09"
                  />
                </main>
              </React.Fragment>
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
