import React from 'react';
import './style.css';

export default ({
  children,
  className,
  logoutClass,
  secondNavDisplay,
  markDisplay,
  status,
  statusDsiplay,
}) => (
  <nav className="nav">
    <div className="nav__wrapped-bars">
      <div className={className}>
        {children}
        <div className="nav__Logout-and-status">
          <p className="nav__logout">Logout</p>
          <h4 className={`nav__opened-ticket-status ${statusDsiplay} `}>{status}</h4>
        </div>
      </div>
      <div className="second-nav">
        <p className={`second-nav__select-all ${secondNavDisplay}`}>Select all</p>
        <div className={`second-nav__mark-as ${secondNavDisplay} ${markDisplay}`}>
          <p>Mark as &#9662;</p>
          <div className="second-nav__mark-as-options">
            <p className="mark-pending">Pending</p>
            <p className="mark-resolved">Resolved</p>
          </div>
        </div>
      </div>
    </div>
  </nav>
);
