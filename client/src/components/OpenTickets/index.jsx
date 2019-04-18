import React , { Component } from "react";
import LogoTicket from './LogoTicket';
import ContentLogo from './ContentLogo';
import TickectSubject from './TickectSubject';
import Replies from './Replies';
import TheRely from './TheRely';
export default  class OpenTickets extends Component {
    // state = {
    //     reply : " ",
    // };
    render() {
        return (    
                <section className="containerticket">
                    <div className="ticket_subject " >
                        Ticket Subject
                    </div>
                    <div className="logo_ticket">
                        <LogoTicket />
                        <div className="content_logo">
                            <ContentLogo />
                        </div>
                    </div>
                    <div className="ticket_subject">
                        < TickectSubject />
                    </div>
                    <div className="allReplies">
                        <Replies />
                    </div>
                    <div className="content_reply">
                        Reply :
                        <div className="the_reply">
                            < TheRely />
                        </div>
                    </div>
                </section>
            
        )
    }
} 