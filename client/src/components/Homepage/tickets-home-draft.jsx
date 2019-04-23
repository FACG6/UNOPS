import React, { Fragment } from 'react';
import Navbar from '../navbar/Navbar';
import './style.css';
import MainSidebar from '../MainSidebar';

const HomeDraft = () => (
  <Fragment>
    <MainSidebar selected="tickets" />
    <Navbar className="home-nav" secondNavDisplay="display-none" />
  </Fragment>
);
export default HomeDraft;
