import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import MainSidebar from '../MainSidebar';
import './style.css';

class NewTicket extends Component {
  render() {
    return (
      <React.Fragment>
        <MainSidebar selected="tickets" />
        <Navbar
          className="new-ticket-nav"
          children={[
            <div className="new-ticket">
              <h3>New Ticket</h3>
            </div>,
          ]}
        />
      </React.Fragment>
    );
  }
}

export default NewTicket;
