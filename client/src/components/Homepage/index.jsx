import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import './style.css';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
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
                <div id="circle">
                  10
                </div>
              </div>
            </div>,
          ]}
        />
      </React.Fragment>
    );
  }
}

export default Home;
