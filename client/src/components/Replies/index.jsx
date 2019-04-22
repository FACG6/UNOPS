import React, { Component } from 'react';
import Conversation from '../Conversation';
import './style.css';

class Replies extends Component {
    state = {
      replies: [],
    }

    componentDidMount() {
      this.setState({
        replies: [
          {
            id: 1,
            email: 'jamalat@getsMaxListeners.com',
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, ',
          },
          {
            id: 2,
            email: 'jamalat@getMadxListeners.com',
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, ',
          },
          {
            id: 3,
            email: 'jamalat@getMaxListeners.com',
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, ',
          },
        ],
      });
    }

    render() {
      return (
        <div className="replies-component">
          <p className="replies-component__replies-text">Replies :</p>
          <div>
            {this.state.replies.map(reply => <Conversation key={reply.id} reply={reply} />)}

          </div>
        </div>
      );
    }
}
export default Replies;
