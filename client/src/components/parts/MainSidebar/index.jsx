import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import './style.css';

export default function MainSideBar({ selected }) {
  return (
    <aside className="main-sidebar">
      <Link to="/" className="main-sidebar__tab">
        <Logo className="main-sidebar__logo" />
      </Link>

      <Link
        to="/tickets"
        className={`main-sidebar__tab ${selected === 'tickets' ? 'tab__focus' : ''}`}
      >
        <i className="fas fa-ticket-alt ticket-icon" />
        <span className="main-sidebar__text">Tickets</span>
      </Link>

      <Link
        to="/search"
        className={`main-sidebar__tab ${selected === 'search' ? 'tab__focus' : ''}`}
      >
        <i className="fas fa-search search-icon" />
        <span className="main-sidebar__text">Search</span>
      </Link>

      <Link
        to="/reports"
        className={`main-sidebar__tab ${selected === 'reports' ? 'tab__focus' : ''}`}
      >
        <i className="fas fa-chart-bar chart-icon" />
        <span className="main-sidebar__text">Reports</span>
      </Link>
    </aside>
  );
}

MainSideBar.propTypes = {
  selected: PropTypes.string.isRequired,
};
