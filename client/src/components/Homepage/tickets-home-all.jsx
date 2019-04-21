import React, { Component, Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import './style.css';
import MainSidebar from '../MainSidebar';

class HomeAll extends Component {
  render() {
    return (
      <Fragment>
        <MainSidebar selected="tickets" />
        <Navbar
          logoutClass="home-logout"
          className="homeNav"
          children={[
            <div className="statusdiv">
              <div className={`pendingDiv ${this.props.pendingClass}`}>
                <h4 onClick="function" className="status">
                  Pending
                </h4>
                <div className="circle">10</div>
              </div>
              {' '}
              <div className={`closedDiv ${this.props.closedClass}`}>
                <h4 onClick="function" className="status">
                  Closed
                </h4>
                <div className="circle">10</div>
              </div>
            </div>,
          ]}
        />
      </Fragment>
    );
  }
}

export default HomeAll;
