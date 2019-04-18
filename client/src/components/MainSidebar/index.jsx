import React from 'react';
import './style.css';
import Logo from '../Logo';

export default ({ selected }) => (
  <aside className="main-sidebar">
    <a href="/" className="main-sidebar__tab">
      <Logo className="main-sidebar__logo" />
    </a>

    <a href="/" className={`main-sidebar__tab ${selected === 'tickets' ? 'tab__focus' : ''}`}>
      <i className="fas fa-ticket-alt ticket-icon" />
      <span className="main-sidebar__text">Tickets</span>
    </a>

    <a href="/" className={`main-sidebar__tab ${selected === 'search' ? 'tab__focus' : ''}`}>
      <i className="fas fa-search search-icon" />
      <span className="main-sidebar__text">Search</span>
    </a>

    <a href="/" className={`main-sidebar__tab ${selected === 'reports' ? 'tab__focus' : ''}`}>
      <i className="fas fa-chart-bar chart-icon" />
      <span className="main-sidebar__text">Reports</span>
    </a>
  </aside>
);
