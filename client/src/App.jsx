import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import swal from 'sweetalert2';
import ReactLoading from 'react-loading';
import Login from './components/pages/Login';
import TicketsPage from './components/pages/TicketsPage';
import NewTicketPage from './components/pages/NewTicketPage';
import './App.css';
import OpenedTicketPage from './components/pages/OpenedTicketPage';
import SearchPage from './components/pages/SearchPage';
import { encode } from 'base64-arraybuffer';
const socket = socketIOClient('http://localhost:7425');

export default class App extends Component {
  state = {
    tickets: {
      'all-tickets': {
        pending: [],
        closed: [],
      },
      'my-tickets': {
        pending: [],
        closed: [],
      },
      drafts: [],
      trash: [],
    },
    search: {
      query: '',
      user: '',
      status: '',
    },
    searchResults: null,
  };
  // update status function to be used in 'update-status component.
  updateStatus = () => {
    // need to use two variables here, uid and status..
    socket.emit('update status', { uid: 1002, status: 'pending' });
  };
  // search fuction to be used in search component
  search = () => {
    socket.emit('search', { keyword: 'pending' });
    socket.on('search result', result => {
      console.log('search result', result);
    });
  };

  componentDidMount() {
    const from = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const before = from.toDateString().split(' ');

    const to = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
    const since = to.toDateString().split(' ');

    fetch('/ahmed');
    socket.on('error', error => console.log(error));
    socket.on('request getmails', () => {
      socket.emit('getmails', {
        Since: `${since[2]}-${since[1]}-${since[3]}`,
        Before: `${before[2]}-${before[1]}-${before[3]}`,
      });
    });

    socket.on('userTickets', data => {
      const mail = JSON.parse(data).mailobj;

      if (mail.attachments)
        mail.attachments.forEach((attachment, index) => {
          const arr = new Uint8Array(attachment.content.data);
          mail.attachments[index].content.data = encode(arr);
        });

      const mailAttr = JSON.parse(data).attribs;
      mail.body = mail.html;
      mail.from = mail.from[0].address;
      mail.uid = mailAttr.uid;
      mail.date = new Date(mail.date).toLocaleDateString();
      const resolved = mailAttr.flags.includes('resolved');
      if (resolved)
        this.setState(prevState => {
          const newState = { ...prevState };
          newState.tickets['all-tickets'].closed.unshift(mail);
          return newState;
        });
      else
        this.setState(prevState => {
          const newState = { ...prevState };
          newState.tickets['all-tickets'].pending.unshift(mail);
          return newState;
        });
    });
    socket.on('mails', data => {
      const mail = JSON.parse(data).mailobj;

      if (mail.attachments)
        mail.attachments.forEach((attachment, index) => {
          const arr = new Uint8Array(attachment.content.data);
          mail.attachments[index].content.data = encode(arr);
        });

      const mailAttr = JSON.parse(data).attribs;
      mail.body = mail.html;
      mail.from = mail.from[0].address;
      mail.uid = mailAttr.uid;
      mail.date = new Date(mail.date).toLocaleDateString();
      const resolved = mailAttr.flags.includes('resolved');
      if (resolved)
        this.setState(prevState => {
          const newState = { ...prevState };
          newState.tickets['all-tickets'].closed.unshift(mail);
          return newState;
        });
      else
        this.setState(prevState => {
          const newState = { ...prevState };
          newState.tickets['all-tickets'].pending.unshift(mail);
          return newState;
        });
    });
    socket.on('notification', () => {
      swal.fire({
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 3000,
        type: 'info',
        title: 'New mail was recieved',
      });
      socket.emit('get new mail');
    });
    socket.on('new mail', newMail => {
      const mail = JSON.parse(newMail).mailobj;
      const mailAttr = JSON.parse(newMail).attribs;
      mail.body = mail.html;
      mail.from = mail.from[0].address;
      mail.uid = mailAttr.uid;
      mail.date = new Date(mail.date).toLocaleDateString();
      const resolved = mailAttr.flags.includes('resolved');
      if (resolved)
        this.setState(prevState => {
          const newState = { ...prevState };
          newState.tickets['all-tickets'].closed.unshift(mail);
          return newState;
        });
      else
        this.setState(prevState => {
          const newState = { ...prevState };
          newState.tickets['all-tickets'].pending.unshift(mail);
          return newState;
        });
    });
  }
  componentWillUnmount() {
    socket.off('mails');
    socket.off('update status');
    socket.off('notification');
    socket.off('new mail');
  }

  getTicketByUid = uid => {
    const { tickets } = this.state;
    for (const key in tickets) {
      if (tickets[key] instanceof Array) {
        if (tickets[key].find(ticket => ticket.uid === uid)) {
          return {
            ticket: tickets[key].find(ticket => ticket.uid === uid),
            category: `${key}`,
          };
        }
        continue;
      } else {
        for (const statusKey in tickets[key]) {
          if (tickets[key][statusKey].find(ticket => ticket.uid === uid)) {
            return {
              ticket: tickets[key][statusKey].find(ticket => ticket.uid === uid),
              category: `${key}`,
            };
          }
          continue;
        }
      }
    }
    return undefined;
  };

  allTicketsCount = () => {
    const allTickets = this.state.tickets['all-tickets'];
    return allTickets.pending.length + allTickets.closed.length;
  };

  myTicketsCount = () => {
    const myTickets = this.state.tickets['my-tickets'];
    return myTickets.pending.length + myTickets.closed.length;
  };

  allPendingTicketsCount = () => this.state.tickets['all-tickets'].pending.length;

  myPendingTicketsCount = () => this.state.tickets['my-tickets'].pending.length;

  addClosedTicketsCount = () => this.state.tickets['all-tickets'].closed.length;

  myClosedTicketsCount = () => this.state.tickets['my-tickets'].closed.length;

  draftsCount = () => this.state.tickets.drafts.length;

  trashCount = () => this.state.tickets.trash.length;

  render() {
    const { pending, closed } = this.state.tickets['all-tickets'];
    return pending.length || closed.length ? (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={() => <Redirect to="/tickets" />} />
          <Route exact path="/tickets" component={() => <Redirect to="/tickets/all-tickets" />} />
          <Route
            exact
            path="/tickets/:category"
            render={({
              match: {
                params: { category },
              },
            }) => {
              if (category === 'all-tickets' || category === 'my-ticekts')
                return <Redirect to={`/tickets/${category}/pending`} />;
              return <Redirect to="/404" />;
            }}
          />
          <Route
            exact
            path="/tickets/:category/:status"
            render={props => {
              const { category, status } = props.match.params;
              if (category === 'all-tickets' || category === 'my-ticekts')
                if (status === 'pending' || status === 'closed')
                  return <TicketsPage {...props} tickets={this.state.tickets} />;
              return <Redirect to="/404" />;
            }}
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
                params: { uid },
              },
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
                tickets={this.state.tickets['all-tickets'].pending}
                pending={this.allPendingTicketsCount()}
                closed={this.addClosedTicketsCount()}
              />
            )}
          />
          <Route
            path="/"
            render={() => (
              <h1 style={{ margin: '10px', fontFamily: 'Lato' }}>404 Page Not Found</h1>
            )}
          />
        </Switch>
      </Router>
    ) : (
      <div className="tickets-page__loading">
        <ReactLoading type="spin" color="#437489" width="200px" height="200px" />
      </div>
    );
  }
}
