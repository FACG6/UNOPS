import React from 'react';
import './style.css';
import Navbar from '../navbar/Navbar';
import Sidebar from './Sidebar';
import MainSidebar from '../MainSidebar/index';

export default ({
  match: {
    params: { status },
  },
}) => (
  <div className="search-components">
    <MainSidebar selected="search" />
    <Navbar className="home-nav">
      <div className="home-nav__status-div">
        <div className={`home-nav__pending-div ${status === 'pending' ? 'selected' : ''}`}>
          <h4 className="status">Pending</h4>
          <div className="circle">10</div>
        </div>
        <div className={`home-nav__closed-div ${status === 'closed' ? 'selected' : ''}`}>
          <h4 className="status">Closed</h4>
          <div className="circle">10</div>
        </div>
      </div>
    </Navbar>
    <Sidebar />
  </div>
);
