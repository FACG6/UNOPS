import React , { Component } from "react";

export default  class TickectSubject extends Component {
    render() {
        return (    
                <div className="content_ticket">
                <h3>
                    From: 
                    <h4>senderemail@gmail.com</h4>
                </h3>
                <h3>
                    CC:
                    <h4>cc.email@gmail.com</h4>
                </h3>
                <h3>
                    BCC : 
                    <h4>bcc.email@gmail.com</h4>
                </h3>
                </div>
            
        )
    }
} 