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
  <div style={{ display: 'flex' }}>
    <MainSidebar selected="search" />
    <Navbar logoutClass="home-logout" className="homeNav">
      <div className="statusdiv">
        <div className={`pendingDiv ${status === 'pending' ? 'selected' : ''}`}>
          <h4 className="status">Pending</h4>
          <div className="circle">10</div>
        </div>
        <div className={`closedDiv ${status === 'closed' ? 'selected' : ''}`}>
          <h4 className="status">Closed</h4>
          <div className="circle">10</div>
        </div>
      </div>
    </Navbar>
    <Sidebar />
  </div>
);
