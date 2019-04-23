import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

export default function Navbar({
  selected, pending, closed, currentCat,
}) {
  return (
    <nav className="nav">
      <div className="nav__status-divs">
        <Link
          to={`/tickets/${currentCat}/pending`}
          className={`nav__status ${selected === 'pending' ? 'nav__status--selected' : ''}`}
        >
          <span className="nav__status-text">Pending</span>
          <div className={`nav__num-div ${selected === 'pending' ? 'nav__num-div--selected' : ''}`}>
            {pending}
          </div>
        </Link>
        <Link
          to={`/tickets/${currentCat}/closed`}
          className={`nav__status ${selected === 'closed' ? 'nav__status--selected' : ''}`}
        >
          <span className="nav__status-text">Closed</span>
          <div className={`nav__num-div ${selected === 'closed' ? 'nav__num-div--selected' : ''}`}>
            {closed}
          </div>
        </Link>
      </div>
      <a href="/logout" className="nav__logout-div logout">
        Logout
      </a>
    </nav>
  );
}

Navbar.propTypes = {
  selected: PropTypes.string.isRequired,
  currentCat: PropTypes.string.isRequired,
  pending: PropTypes.number.isRequired,
  closed: PropTypes.number.isRequired,
};
