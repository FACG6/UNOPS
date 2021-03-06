import React, { Component } from 'react';
import EmailCopy from '../EmailCopy';
import './style.css';

export default class NewTicket extends Component {
  state = {
    subject: '',
    to: '',
    cc: '',
    bcc: '',
    body: '',
    addCc: false,
    addBcc: false,
    sendAsEmail: false,
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
      <section className="new-ticket">
        <div className="new-ticket__text new-ticket__text--strong">New Ticket</div>
        <form className="new-ticket__form">
          <div className="new-ticket__label">
            <span className="new-ticket__text">
              Subject:
              <span className="required">*</span>
            </span>
            <input
              type="text"
              className="new-ticket__subject-input new-ticket__input"
              placeholder="Ticket's subject"
            />
          </div>
          <div className="new-ticket__label">
            <span className="new-ticket__text">To:</span>
            <input
              type="text"
              className="new-ticket__to-input new-ticket__input"
              placeholder="Enter Recipient"
            />
          </div>
          <div className="new-ticket__copies-div">
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
          <textarea className="new-ticket__message-field" placeholder="Enter your message" />
          <label htmlFor="checkbox" className="new-ticket__send-as-mail">
            <input type="checkbox" id="checkbox" className="new-ticket__checkbox" />
            <span className="new-ticket__text">Send the ticket as email.</span>
          </label>
          <div className="new-ticket__submit">Create Ticket</div>
        </form>
      </section>
    );
  }
}
