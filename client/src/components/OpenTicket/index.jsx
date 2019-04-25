import React from 'react';
import './style.css';
import ContentLogo from './ContentLogo';
import ContentSubject from './ContentSubject';
import TheReply from './TheReply';
import Logo from '../Logo';

const OpenTicket = () => (
  <section className="container-ticket">
    <div className="container-ticket__div-logo">
      <Logo className="container-ticket__ticket-logo" />
    </div>
    <div className="content-logo">
      <ContentLogo />
    </div>
    <div className="ticket-subject">
      <ContentSubject />
    </div>
    <div className="the-reply">
      <TheReply />
    </div>
  </section>
);

export default OpenTicket;
