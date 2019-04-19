import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import MainSidebar from '../MainSidebar';
import NewTicketForm from './New-ticket-form';
import './style.css';

class NewTicket extends Component {
  render() {
    return (
      <React.Fragment>
        <MainSidebar selected="tickets" />
        <Navbar
          className="new-ticket-nav"
          children={[
            <div className="new-ticket-header">
              <h3>New Ticket</h3>
            </div>,
          ]}
        />
        <NewTicketForm />
      </React.Fragment>
    );
  }
}

export default NewTicket;
