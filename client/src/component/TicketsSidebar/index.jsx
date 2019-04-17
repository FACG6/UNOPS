import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './style.css';

class TicketsSidebar extends Component {
  render() {
    return (
      <div className="ticket--side-bar">
        <button className="new--ticket">
          <span><i className="fas fa-plus" /></span>
          {'                '}
          Ticket
        </button>
        <div className="ticket--side-bar-links">
          <Router>
            <div className="links">
              <Link to="/tickets/all" className="anchor--all link">
                All
                {' '}
              </Link>
              <i className="far fa-circle" />
            </div>
            <div className="links">
              <Link to="/tickets/my" className="anchor--my link">My</Link>
              <i className="far fa-circle" />
            </div>
            <div className="links">
              <Link to="/tickets/drafts" className="anchor--drafts link">Drafts</Link>
              <i className="far fa-circle" />
            </div>
            <div className="links">
              <Link to="trash" className="anchor--trash link">Trash</Link>
              <i className="far fa-circle" />
            </div>
          </Router>
        </div>

      </div>
    );
  }
}
export default TicketsSidebar;
