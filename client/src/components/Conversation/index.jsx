import React, { Component } from 'react';
import './style.css';

class Conversation extends Component {
  render() {
    return (

      <div className="conversation-container">
        <div className="conversation-container__email-container">
          <p> Email : </p>
          <p className="conversation-container__email">{this.props.reply.email}</p>
        </div>
        <div className="conversation-container__message-container">
          <p>Message: </p>
          <p className="conversation-container__message">{this.props.reply.message}</p>
        </div>
      </div>
    );
  }
}

export default Conversation;
