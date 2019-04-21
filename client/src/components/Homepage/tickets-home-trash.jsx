import React, { Component, Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import './style.css';
import MainSidebar from '../MainSidebar';

class HomeTrash extends Component {
  render() {
    return (
      <Fragment>
        <MainSidebar selected="tickets" />
        <Navbar
          logoutClass="trash-logout"
          className="homeNav"
          markDisplay="mark-as-display"
          children={[<h1 className="trash-header">Trash Emails:</h1>]}
        />
      </Fragment>
    );
  }
}

export default HomeTrash;
