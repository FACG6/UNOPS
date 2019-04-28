import React, { Component } from 'react';
import EmailCopy from '../EmailCopy';
import './style.css';

export default class Reply extends Component {
  state = {
    cc: [],
    bcc: [],
    addCc: false,
    addBcc: false,
    reply: '',
  };

  toggleAdd = (target) => {
    target = target === 'cc' ? 'addCc' : 'addBcc';
    this.setState({ [target]: !this.state[target] });
  };

  addNew = (event, target) => {
    if (event.charCode === 13) {
      if (!event.target.value) this.toggleAdd(target);
      else this.setState({ [target]: [...this.state[target], event.target.value] }, () => this.toggleAdd(target));
    }
  };

  render() {
    const {
      cc, bcc, addCc, addBcc,
    } = this.state;
    return (
      <section className="reply-section">
        <div className="reply-section__text">Reply:</div>
        <div className="reply-section__reply-form">
          <div className="reply-section__copies">
            <EmailCopy
              add={addCc}
              type="cc"
              copy={cc}
              addNew={this.addNew}
              toggleAdd={this.toggleAdd}
            />
            <EmailCopy
              add={addBcc}
              type="bcc"
              copy={bcc}
              addNew={this.addNew}
              toggleAdd={this.toggleAdd}
            />
          </div>
          <textarea className="reply-section__reply-field" />
          <div className="reply-section__submit">Reply</div>
        </div>
      </section>
    );
  }
}
