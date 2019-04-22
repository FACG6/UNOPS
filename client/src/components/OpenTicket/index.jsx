import React, { Component } from 'react';
import './style.css';
import ContentLogo from './ContentLogo';
import ContentSubject from './ContentSubject';
import TheReply from './TheReply';
import Logo from '../Logo'
export default class OpenTicket extends Component {
  render() {
		return (
			<section className="containerticket">
                    
                        <Logo className="ticket_logo" />
                        <div className="content_logo">
                            <ContentLogo />
                        
                    </div>
                    <div className="ticket_subject">
                        < ContentSubject />
                    </div>
                   
                    
                        <div className="the_reply">
                            < TheReply />
                        
                    </div>
                </section>
     
		);
  }
}
