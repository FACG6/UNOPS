import React from 'react';
import './style.css';

export default ({ children, className }) => (
  <nav className="nav">
    <div className={className}>
      {children.map(element => element)}
      <div>
        <p className="Logout">Logout</p>
      </div>
    </div>
  </nav>
);
