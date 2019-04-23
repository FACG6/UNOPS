import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

export default function TicketsSidebar({
  selected, all, my, drafts, trash,
}) {
  return (
    <aside className="tickets-sidebar">
      <Link to="/new-ticket" className="tickets-sidebar__new-ticket">
        <i className="fas fa-plus tickets-sidebar__plus-icon" />
        Ticket
      </Link>

      <div className="tickets-sidebar__links-container">
        <Link
          to="/tickets/all"
          className={`tickets-sidebar__link ${selected === 'all' ? 'selected-tab' : ''}`}
        >
          <span className="tickets-sidebar__text">All</span>
          <div
            className={`tickets-sidebar__num-div ${selected === 'all' ? 'circle-selected' : ''}`}
          >
            {all}
          </div>
        </Link>
        <Link
          to="/tickets/my"
          className={`tickets-sidebar__link ${selected === 'my' ? 'selected-tab' : ''}`}
        >
          <span className="tickets-sidebar__text">My</span>
          <div className={`tickets-sidebar__num-div ${selected === 'my' ? 'circle-selected' : ''}`}>
            {my}
          </div>
        </Link>
        <Link
          to="/tickets/drafts"
          className={`tickets-sidebar__link ${selected === 'drafts' ? 'selected-tab' : ''}`}
        >
          <span className="tickets-sidebar__text">Drafts</span>
          <div
            className={`tickets-sidebar__num-div ${selected === 'drafts' ? 'circle-selected' : ''}`}
          >
            {drafts}
          </div>
        </Link>
        <Link
          to="/tickets/trash"
          className={`tickets-sidebar__link ${selected === 'trash' ? 'selected-tab' : ''}`}
        >
          <span className="tickets-sidebar__text">Trash</span>
          <div
            className={`tickets-sidebar__num-div ${selected === 'trash' ? 'circle-selected' : ''}`}
          >
            {trash}
          </div>
        </Link>
      </div>
    </aside>
  );
}

TicketsSidebar.propTypes = {
  selected: PropTypes.string.isRequired,
  all: PropTypes.number.isRequired,
  my: PropTypes.number.isRequired,
  drafts: PropTypes.number.isRequired,
  trash: PropTypes.number.isRequired,
};
