import React from 'react';
import './style.css';

export default ({ children, className }) => (
  <nav className={className}>
    {children.map(element => element)}
    <p className="Logout">Logout</p>
  </nav>
);
