import React, { Component, Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import './style.css';
import MainSidebar from '../MainSidebar';

class HomeDraft extends Component {
  render() {
    return (
      <Fragment>
        <MainSidebar selected="tickets" />
        <Navbar
          logoutClass="trash-logout"
          className="homeNav"
          secondNavDisplay="display-none"
          children={[]}
        />
      </Fragment>
    );
  }
}

export default HomeDraft;
