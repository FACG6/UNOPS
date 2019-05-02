import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/pages/Login';
import TicketsPage from './components/pages/TicketsPage';
import NewTicketPage from './components/pages/NewTicketPage';
import ticketsSample from './components/model';
import './App.css';
import OpenedTicketPage from './components/pages/OpenedTicketPage';
import SearchPage from './components/pages/SearchPage';
import socketIOClient from 'socket.io-client';
import FileSaver from 'file-saver';
const atob = require('atob');
const socket = socketIOClient('http://localhost:7425');
const fs = require('fs');

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
//update status function to be used in 'update-status component.
  updateStatus = () => {
    //need to use two variables here, uid and status.. 
      socket.emit('update status', {uid:1002, status:'pending'}) 
      }
 //search fuction to be used in search component
      search = () => {
    socket.emit('search', {keyword:'pending'});
    socket.on('search result', (result) => {
     // console.log('search result',result)
       })
     }


  componentDidMount() {
    socket.on('error', error => console.log(error));
    socket.on('request getmails', ()=> { 
       socket.emit('getmails'
      //  ,        {Since: '02-May-2012',Before: '05-June-2013' }
       );
    })

    // socket.on('mails', data => {
      // console.log('mailobj',JSON.parse(data).mailobj)
      // console.log('attribs',JSON.parse(data).attribs)
      // let mail = JSON.parse(data).mailobj;
      // let mailAttribs = JSON.parse(data).attribs;
      // if(mailAttribs.flags[0]== 'resolved'){
      // let tickets = {...this.state.tickets};
      //   tickets['all-tickets'].resolved.pending.push(mail);
      //   this.setState({tickets});
      // }else{
      //  let  tickets = {...this.state.tickets};
      //  tickets['all-tickets'].pending.push(mail);
      //   this.setState({tickets});
      // }
      // console.log(this.state.tickets['all-tickets']);
    // });
    socket.on('notification', () => {
      socket.emit('get new mail')
    });
        socket.on('mails', data => {
          // x.pipe(fs.createWriteStream('ddddddffff.png'))
          let blob = new blob([data], {type: "text/plain;charset=utf-8"})
          FileSaver.saveAs(blob, 'newimageattachment.png');
         console.log(atob(data));
        })









    // socket.on('new mail', (newMail) => {
    //   let mail = JSON.parse(newMail).mailobj;
    //   let mailAttribs = JSON.parse(newMail).attribs;
    //   if(mailAttribs.flags[0]== 'resolved'){
    //   let tickets = {...this.state.tickets};
    //   /// it depends here on how you would like to render the emails, I mean which to use, push or unshift..
    //     tickets['all-tickets'].resolved.pending.push(newMail);
    //     this.setState({tickets});
    //   }else{
    //    let  tickets = {...this.state.tickets};
    //    tickets['all-tickets'].pending.push(newMail);
    //     this.setState({tickets});
    //   }
    // });
  }
  componentWillUnmount() {
    socket.off("mails");
    socket.off("update status");
    socket.off("notification");
    socket.off("new mail");
  }

  // getTicketByUid = uid => {
  //   const { tickets } = this.state;
  //   for (const key in tickets) {
  //     if (tickets[key] instanceof Array) {
  //       if (tickets[key].find(ticket => ticket.uid === uid)) {
  //         return {
  //           ticket: tickets[key].find(ticket => ticket.uid === uid),
  //           category: `${key}`,
  //         };
  //       }
  //       continue;
  //     } else {
  //       for (const statusKey in tickets[key]) {
  //         if (tickets[key][statusKey].find(ticket => ticket.uid === uid)) {
  //           return {
  //             ticket: tickets[key][statusKey].find(ticket => ticket.uid === uid),
  //             category: `${key}`,
  //           };
  //         }
  //         continue;
  //       }
  //     }
  //   }
  //   return undefined;
  // };

  // allTicketsCount = () => {
  //   const allTickets = this.state.tickets['all-tickets'];
  //   return allTickets.pending.length + allTickets.closed.length;
  // };

  // myTicketsCount = () => {
  //   const myTickets = this.state.tickets['my-tickets'];
  //   return myTickets.pending.length + myTickets.closed.length;
  // };

  // allPendingTicketsCount = () => this.state.tickets['all-tickets'].pending.length;

  // myPendingTicketsCount = () => this.state.tickets['my-tickets'].pending.length;

  // addClosedTicketsCount = () => this.state.tickets['all-tickets'].closed.length;

  // myClosedTicketsCount = () => this.state.tickets['my-tickets'].closed.length;

  // draftsCount = () => this.state.tickets.drafts.length;

  // trashCount = () => this.state.tickets.trash.length;

  render() {
    return (
      <Router>
    {/* //     <Switch> */}
    {/* //       <Route path="/login" component={Login} /> */}
    //       <Route exact path="/" component={() => <Redirect to="/tickets" />} />
    {/* //       <Route exact path="/tickets" component={() => <Redirect to="/tickets/all-tickets" />} /> */}
    {/* //       <Route */}
    {/* //         exact */}
    {/* //         path="/tickets/:category" */}
    {/* //         component={({ */}
    {/* //           match: { */}
    {/* //             params: { category }, */}
    {/* //           }, */}
    {/* //         }) => { */}
    {/* //           if (category === 'all-tickets' || category === 'my-ticekts') */}
    {/* //             return <Redirect to={`/tickets/${category}/pending`} />; */}
    {/* //           return <Redirect to={`/tickets/${category}`} />; */}
    {/* //         }} */}
    {/* //       /> */}
    {/* //       <Route */}
    {/* //         exact */}
    {/* //         path="/tickets/:category/:status" */}
    {/* //         component={props => <TicketsPage {...props} tickets={this.state.tickets} />} */}
    {/* //       /> */}
    {/* //       <Route */}
    {/* //         path="/new-ticket" */}
    {/* //         component={() => ( */}
    {/* //           <NewTicketPage */}
    {/* //             allTickets={this.allTicketsCount()} */}
    {/* //             myTickets={this.myTicketsCount()} */}
    {/* //             drafts={this.draftsCount()} */}
    {/* //             trash={this.trashCount()} */}
    {/* //           /> */}
    {/* //         )} */}
    {/* //       /> */}
    {/* //       <Route */}
    {/* //         path="/ticket/:uid" */}
    {/* //         component={({ */}
    {/* //           match: { */}
    {/* //             params: { uid }, */}
    {/* //           }, */}
    {/* //         }) => ( */}
    {/* //           <OpenedTicketPage */}
    {/* //             {...this.getTicketByUid(parseInt(uid, 10))}
    //             allTickets={this.allTicketsCount()}
    //             myTickets={this.myTicketsCount()}
    //             drafts={this.draftsCount()}
    //             trash={this.trashCount()}
    //           />
    //         )}
    //       />
    //       <Route */}
    {/* //         path="/search"
    //         component={() => ( */}
    {/* //           <SearchPage
    //             {...this.state.search}
    //             searchResults={this.searchResults}
    //             tickets={this.state.tickets['all-tickets'].pending}
    //             pending={this.allPendingTicketsCount()}
    //             closed={this.addClosedTicketsCount()}
    //           />
    //         )}
    //       />
    //     </Switch> */}
      </Router>
    );
  }
}
