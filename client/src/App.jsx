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
    ticketsUids: [],
    scrollcounter:1,
  };
  // update status function to be used in 'update-status component.
  updateStatus = (uids, markAs) => {
    socket.emit('update status', { uids, markAs });
    socket.on('update status done', () => window.location.reload());
  };
  // search fuction to be used in search component
  updateSearch = (element, value) => {
    const stateSearch = this.state.search;
    stateSearch[element] = value;
    let filtered = {
      pending: [],
      closed: [],
    };
    switch (element){
      case 'query':
      for(let t in this.state.tickets['all-tickets'].pending){
        let regex = new RegExp(value);
        if(regex.test(this.state.tickets['all-tickets'].pending[t].from)){
          filtered.pending.push(this.state.tickets['all-tickets'].pending[t]);
        }
      }
      for(let t in this.state.tickets['all-tickets'].closed){
        console.log(1111111111,this.state.tickets['all-tickets'].pending[t], value)
        if(t['all-tickets'].closed[0].from === value){
          filtered.closed.push(t);
        }
      }
      break;
      case 'status':
      if(value == 'pending'){
        filtered.pending = this.state.tickets['all-tickets'].pending;
      }else {
        filtered.closed = this.state.tickets['all-tickets'].closed
      }
      break;
      case 'user':
      for(let t in this.state.tickets['all-tickets'].pending ){
        if(this.state.tickets['all-tickets'].pending[t].user){
          filtered.pending = this.state.tickets['all-tickets'].pending[t];
        }
      }
      for(let t in this.state.tickets['all-tickets'].closed ){
        console.log(1111111111,this.state.tickets['all-tickets'].pending[t], value)
        if(this.state.tickets['all-tickets'].closed[t].user){
          filtered.closed = this.state.tickets['all-tickets'].closed[t];
        }
      }
    }
    this.setState({search: stateSearch, searchResults:filtered})
  }

  componentDidMount() {
    const from = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
    const since = from.toDateString().split(' ');

    const to = new Date(Date.now() + 1000 * 60 * 60 * 24);
    const before = to.toDateString().split(' ');

    fetch('/ahmed');
    socket.on('error', error => console.log(error));
    socket.on('request getmails', () => {
      socket.emit('getmails', {
        Since: `${since[2]}-${since[1]}-${since[3]}`,
        Before: `${before[2]}-${before[1]}-${before[3]}`,
      });
    });

    socket.on('userTickets', data => {
      let mail = JSON.parse(data).mailobj;
      mail.user= true;

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
      const resolved = mailAttr.flags.includes('closed');
      if (resolved)
        this.setState(prevState => {
          const newState = { ...prevState };
          newState.tickets['all-tickets'].closed.unshift(mail);
          newState.ticketsUids.unshift(mail.uid);
          return newState;
        });
      else
        this.setState(prevState => {
          const newState = { ...prevState };
          newState.tickets['all-tickets'].pending.unshift(mail);
          newState.ticketsUids.unshift(mail.uid);
          return newState;
        });
    });
    socket.on('mails', data => {
      const mail = JSON.parse(data).mailobj;
      console.log(JSON.parse(data));

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
      const resolved = mailAttr.flags.includes('closed');
      if (resolved)
        this.setState(prevState => {
          const newState = { ...prevState };
          newState.tickets['all-tickets'].closed.unshift(mail);
          newState.ticketsUids.unshift(mail.uid);
          return newState;
        });
      else
        this.setState(prevState => {
          const newState = { ...prevState };
          newState.tickets['all-tickets'].pending.unshift(mail);
          newState.ticketsUids.unshift(mail.uid);
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
      console.log(mail)
      const mailAttr = JSON.parse(newMail).attribs;
      mail.body = mail.html;
      mail.from = mail.from[0].address;
      mail.uid = mailAttr.uid;
      mail.date = new Date(mail.date).toLocaleDateString();
      const resolved = mailAttr.flags.includes('closed');
      if (resolved)
        this.setState(prevState => {
          const newState = { ...prevState };
          newState.tickets['all-tickets'].closed.unshift(mail);
          newState.ticketsUids.unshift(mail.uid);
          return newState;
        });
      else
        this.setState(prevState => {
          const newState = { ...prevState };
          newState.tickets['all-tickets'].pending.unshift(mail);
          newState.ticketsUids.unshift(mail.uid);
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

  scroll = e => {
    this.setState({scrollcounter: this.state.scrollcounter+1});
    let element = e.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      const from = new Date(Date.now() - (1000 * 60 * 60 * 24 * 7*this.state.scrollcounter));
      const since = from.toDateString().split(' ');
      const to = new Date(Date.now() - (1000 * 60 * 60 * 24 * 7*(this.state.scrollcounter-1)));
      const before = to.toDateString().split(' ');
      socket.emit('getmails', {
        Since: `${since[2]}-${since[1]}-${since[3]}`,
        Before: `${before[2]}-${before[1]}-${before[3]}`,
      });
    }
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

  sendReply = message => {
    socket.emit('sendMail', message);
  };

  render() {
    console.log("ticketsss",this.state.tickets)
    console.log('search',this.state.searchResults)
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
                  return (
                    <TicketsPage
                    scroll = {this.scroll}
                      key="Tickets_Page"
                      {...props}
                      tickets={this.state.tickets}
                      ticketsUids={this.state.ticketsUids}
                      updateStatus={this.updateStatus}
                    />
                  );
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
            render={() => (
              <SearchPage
              scroll = {this.scroll}
               sideBarSearch={this.state.search}
                searchResults={ this.state.searchResults !== null ?  [...this.state.searchResults.pending,...this.state.searchResults.closed] : this.state.searchResults }
                tickets={[...this.state.tickets['all-tickets'].pending, ...this.state.tickets['all-tickets'].closed]}
                pending={this.allPendingTicketsCount()}
                closed={this.addClosedTicketsCount()}
                updateSearch = {this.updateSearch}
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
