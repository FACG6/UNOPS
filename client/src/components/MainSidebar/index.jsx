import React from 'react';
import './style.css';
import { ReactComponent as Logo } from '../../logo.svg';

export default ({ selected }) => (
  <aside className="main-sidebar">
    <a href="/" className="main-sidebar__tab">
      <Logo />
    </a>

    <a href="/" className={`main-sidebar__tab ${selected === 't' ? 'main-sidebar__focus' : ''}`}>
      <i className="fas fa-ticket-alt ticket-icon" />
      <span className="main-sidebar__text">Tickets</span>
    </a>

    <a href="/" className={`main-sidebar__tab ${selected === 's' ? 'main-sidebar__focus' : ''}`}>
      <i className="fas fa-search search-icon" />
      <span className="main-sidebar__text">Search</span>
    </a>

    <a href="/" className={`main-sidebar__tab ${selected === 'r' ? 'main-sidebar__focus' : ''}`}>
      <i className="fas fa-chart-bar chart-icon" />
      <span className="main-sidebar__text">Reports</span>
    </a>
  </aside>
);
