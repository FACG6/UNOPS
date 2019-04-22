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
    <div className="wrapped-bars">
      <div className={className}>
        {children}
        <div className="Logout-and-status">
          <p className={logoutClass}>Logout</p>
          <h4 className={`opened-ticket-status ${statusDsiplay} `}>{status}</h4>
        </div>
      </div>
      <div className="second-nav">
        <p className={`select-all ${secondNavDisplay}`}>Select all</p>
        <div className={`mark-as ${secondNavDisplay} ${markDisplay}`}>
          <p>Mark as &#9662;</p>
          <div className="mark-as-options">
            <p className="mark-pending">Pending</p>
            <p className="mark-resolved">Resolved</p>
          </div>
        </div>
      </div>
    </div>
  </nav>
);
