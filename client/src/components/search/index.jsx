import React, { Fragment } from 'react';
import './style.css';
import Navbar from '../navbar/Navbar';
import Sidebar from './Sidebar';
import MainSidebar from '../MainSidebar/index';

function SearchComponent({ pendingClass, closedClass }) {
  return (
    <div style={{ display: 'flex' }}>
      <MainSidebar selected="search" />
      <Navbar
        logoutClass="home-logout"
        className="homeNav"
        children={[
          <div className="statusdiv">
            <div className={`pendingDiv ${pendingClass}`}>
              <h4 onClick="function" className="status">
                Pending
              </h4>
              <div className="circle">10</div>
            </div>
            {' '}
            <div className={`closedDiv ${closedClass}`}>
              <h4 onClick="function" className="status">
                Closed
              </h4>
              <div className="circle">10</div>
            </div>
          </div>,
        ]}
      />
      <Sidebar />
    </div>
  );
}
export default SearchComponent;
