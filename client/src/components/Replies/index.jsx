import React, { Component } from 'react';
import './style.css';
import Conversation from '../Conversation';

class Replies extends Component {
    state = {
      replies: [],
    }

    componentDidMount() {
      this.setState({
        replies: [
          {
            email: 'jamalat@getsMaxListeners.com',
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, ',
          },
          {
            email: 'jamalat@getMadxListeners.com',
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, ',
          },
          {
            email: 'jamalat@getMaxListeners.com',
            message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, ',
          },
        ],
      });
    }

    render() {
      return (
        <React.Fragment>
          <div>
            <p>Replies :</p>
            <div>
              {this.state.replies.map(reply => <Conversation key={reply.email} reply={reply} />)}

            </div>
          </div>
        </React.Fragment>

      );
    }
}
export default Replies;
