import React, { Component, Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import MainSidebar from '../MainSidebar';
import './style.css';

class LastWeek extends Component {
  render() {
    return (
      <Fragment>
        <MainSidebar selected="reports" />
        <Navbar
          logoutClass="home-logout"
          className="reports-nav"
          secondNavDisplay="display-none"
          children={[
            <div className="statusdiv">
              <h3>{this.props.subject}</h3>
            </div>,
          ]}
        />
      </Fragment>
    );
  }
}
export default LastWeek;
