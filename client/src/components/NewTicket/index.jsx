import React, { Component } from 'react';
import './style.css';

export default class extends Component {
  state = {
    subject: '',
    to: '',
    cc: '',
    bcc: '',
    text: '',
  };

  render() {
    return (
      <main className="new-ticket">
        <span className="new-ticket__header">Create a new ticket</span>
        <form className="new-ticket__form">
          <label htmlFor="subject" className="new-ticket__label">
            <span className="new-ticket__label-text">
              Subject:
              {' '}
              <span className="required">*</span>
            </span>
            <input type="text" id="subject" className="new-ticket__input" />
          </label>
          <label htmlFor="to" id="to-label" className="new-ticket__label">
            <span className="new-ticket__label-text">To:</span>
            <input type="email" id="to" className="new-ticket__input" />
          </label>
          <div className="new-ticket__carbon-copy">
            <div className="new-ticket__carbon-label">
              <span className="new-ticket__label-text">CC:</span>
              <i className="fas fa-plus-circle new-ticket__icon" />
            </div>
            <div className="new-ticket__carbon-label">
              <span className="new-ticket__label-text">BCC:</span>
              <i className="fas fa-plus-circle new-ticket__icon" />
            </div>
          </div>
          <textarea
            name="text"
            id="text"
            className="new-ticket__textarea"
            placeholder="Enter your ticket's description"
          />
          <label htmlFor="checkbox" className="new-ticket__label">
            <input type="checkbox" id="checkbox" className="new-ticket__checkbox" />
            <span className="new-ticket__label-text">Send ticket as email</span>
          </label>
          <input type="button" className="new-ticket__submit" value="Create Ticket" />
        </form>
      </main>
    );
  }
}
