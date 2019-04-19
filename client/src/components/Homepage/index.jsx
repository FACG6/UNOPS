import React, { Component, Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import './style.css';
import MainSidebar from '../MainSidebar';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <MainSidebar selected="tickets" />
        <Navbar
          className="homeNav"
          children={[
            <div className="statusdiv">
              <div className={`pendingDiv ${this.props.pendingClass}`}>
                <h4 className="status">Pending</h4>
                <div id="circle">10</div>
              </div>
              {' '}
              <div className={`closedDiv ${this.props.closedClass}`}>
                <h4 className="status">Closed</h4>
                <div id="circle">10</div>
              </div>
            </div>,
          ]}
        />
      </Fragment>
    );
  }
}

export default Home;
