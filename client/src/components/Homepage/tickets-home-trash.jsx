import React, { Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import './style.css';
import MainSidebar from '../MainSidebar';

const HomeTrash = () => (
  <Fragment>
    <MainSidebar selected="tickets" />
    <Navbar className="home-nav" markDisplay="second-nav__mark-as-display">
      <h1 className="trash-header">Trash Emails:</h1>
    </Navbar>
  </Fragment>
);
export default HomeTrash;
