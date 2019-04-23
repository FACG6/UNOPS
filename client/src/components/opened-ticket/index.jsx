import React, { Component, Fragment } from 'react';
import './style.css';
import MainSidebar from '../MainSidebar/index';
import Navbar from '../navbar/Navbar';

class OpenedTicket extends Component {
  render() {
    return (
      <Fragment>
        <MainSidebar selected="tickets" />
        <Navbar
          className="opened-ticket-nav"
          children={[
            <div className="opened-ticket-header">
              <a href="#" className="back-anchor">
                {' '}
                &lt;&lt; Back
              </a>
              <h3 className="opened-ticket-subject">{this.props.subject}</h3>
            </div>,
          ]}
          status={this.props.status}
          statusDsiplay="nav__opened-ticket-status-display"
        />
      </Fragment>
    );
  }
}
export default OpenedTicket;
