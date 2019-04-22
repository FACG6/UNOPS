import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import NewTicket from './components/NewTicket';
import MainSidebar from './components/MainSidebar';
import WrappedTicket from './components/WrappedTicket';

class App extends Component {
  state = {
    wrappedTickets: [],
  }

  componentDidMount() {
    this.setState({
      wrappedTickets: [{
        id: 1,
        email: 'jamalat@gmail.com',
        description: 'This is a sample ticket with some sample description',
        date: 'April 9'
        , subject: "subject"
      },
      {
        id: 2,
        email: 'jamalat@gmail.com',
        description: 'This is a sample ticket with some sample description',
        date: 'April 9'
        , subject: "subject"
      }, {
        id: 3,
        email: 'jamalat@gmail.com',
        description: 'This is a sample ticket with some sample description',
        date: 'April 9'
        , subject: "subject"
      }, {
        id: 4,
        email: 'jamalat@gmail.com',
        description: 'This is a sample ticket with some sample description',
        date: 'April 9'
        , subject: "subject"
      }]
    })
  }

  render() {
    console.log(this.state.wrappedTickets)
    if (this.state.wrappedTickets) {
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => <WrappedTicket wrappedTickets={this.state.wrappedTickets} />} />
            <Route exact path="/new-ticket" component={NewTicket} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/main-sidebar" component={() => <MainSidebar selected="tickets" />} />
          </Switch>
        </BrowserRouter>
      );
    } else return ""

  }
}
export default App;
