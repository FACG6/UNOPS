import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './style.css';

const TicketsSidebar = ({ selected }) => (
  <div className="ticket-sidebar">
    <button className="ticket-sidebar__new-ticket">
      <i className="fas fa-plus" />
      {'          '}
      Ticket
    </button>
    <div className="ticket-sidebar__links-container">
      <Router>
        <div className={`ticket-sidebar__links  ${selected === 'all' ? 'selected-tab' : ''}`}>
          <Link to="/tickets/all-ticket" className={`ticket-sidebar__all-link ${selected === 'all' ? 'ticket-sidebar__all-link--selected' : ''}`}>
            All
            {' '}
          </Link>
          <i className={`far fa-circle  ${selected === 'all' ? 'fa-circle-selected' : ''}`} />
        </div>
        <div className={`ticket-sidebar__links  ${selected === 'my' ? 'selected-tab' : ''}`}>
          <Link to="/tickets/my-ticket" className={`ticket-sidebar__my-link ${selected === 'my' ? 'selected-tab' : ''}`}>My</Link>
          <i className={`far fa-circle  ${selected === 'my' ? 'fa-circle-selected' : ''}`} />
        </div>
        <div className={`ticket-sidebar__links  ${selected === 'drafts' ? 'selected-tab' : ''}`}>
          <Link to="/tickets/drafts-ticket" className={`ticket-sidebar__drafts-link ${selected === 'drafts' ? 'selected-tab' : ''}`}>Drafts</Link>
          <i className={`far fa-circle  ${selected === 'drafts' ? 'fa-circle-selected' : ''}`} />
        </div>
        <div className={`ticket-sidebar__links  ${selected === 'trash' ? 'selected-tab' : ''}`}>
          <Link to="/tickets/trash-ticket" className={`ticket-sidebar__trash-link ${selected === 'trash' ? 'selected-tab' : ''}`}>Trash</Link>
          <i className={`far fa-circle  ${selected === 'trash' ? 'fa-circle-selected' : ''}`} />
        </div>
      </Router>
    </div>
  </div>
);
export default TicketsSidebar;
