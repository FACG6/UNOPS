import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './style.css';

class TicketsSidebar extends Component {
  render() {
    return (
      <div className="ticket-sidebar">
        <button className="ticket-sidebar__new-ticket">
          <i className="fas fa-plus" />
          {'          '}
          Ticket
        </button>
        <div className="ticket-sidebar__links-container">
          <Router>
            <div className="ticket-sidebar__links">
              <Link to="/tickets/all-ticket" className="ticket-sidebar__all-link">
                All
                {' '}
              </Link>
              <i className="far fa-circle" />
            </div>
            <div className="ticket-sidebar__links">
              <Link to="/tickets/my-ticket" className="ticket-sidebar__my-link">My</Link>
              <i className="far fa-circle" />
            </div>
            <div className="ticket-sidebar__links">
              <Link to="/tickets/drafts-ticket" className="ticket-sidebar__drafts-link">Drafts</Link>
              <i className="far fa-circle" />
            </div>
            <div className="ticket-sidebar__links">
              <Link to="/tickets/trash-ticket" className="ticket-sidebar__trash-link">Trash</Link>
              <i className="far fa-circle" />
            </div>
          </Router>
        </div>

      </div>
    );
  }
}
export default TicketsSidebar;
