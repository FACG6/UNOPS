import React from 'react';
import './style.css';
import ContentLogo from './ContentLogo';
import ContentSubject from './ContentSubject';
import TheReply from './TheReply';
import Logo from '../Logo';

const OpenTicket = () => (
  <section className="containerticket">
    <div className="div_logo">
      <Logo className="ticket_logo" />
    </div>
    <div className="content_logo">
      <ContentLogo />
    </div>
    <div className="ticket_subject">
      <ContentSubject />
    </div>
    <div className="the_reply">
      <TheReply />
    </div>
  </section>
);

export default OpenTicket;
