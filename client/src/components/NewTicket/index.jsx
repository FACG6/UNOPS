import React, { Component, Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import MainSidebar from '../MainSidebar';
import NewTicketForm from './NewTicketForm';
import './style.css';

class NewTicket extends Component {
  render() {
    return (
      <Fragment>
        <MainSidebar selected="tickets" />
        <Navbar
          className="new-ticket-nav"
          secondNavDisplay="display-none"
          children={[
            <div className="new-ticket-header">
              <h3>New Ticket</h3>
            </div>,
          ]}
        />
        <NewTicketForm />
      </Fragment>
    );
  }
}

export default NewTicket;
