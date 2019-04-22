import React, { Component } from 'react';
import Conversation from '../Conversation';
import './style.css';

const Replies = props => (
  <div className="replies-component">
    <p className="replies-component__replies-text">Replies :</p>
    <div>
      {props.replies.map(reply => <Conversation key={reply.id} reply={reply} />)}

    </div>
  </div>
);
export default Replies;
