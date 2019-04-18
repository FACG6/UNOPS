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
      <main className="main">
        <span className="main__header">Create a new ticket</span>
        <form className="main__form">
          <label htmlFor="subject" className="main__label">
            <span className="main__label-text">
              Subject:
              {' '}
              <span className="required">*</span>
            </span>
            <input type="text" id="subject" className="main__input" />
          </label>
          <label htmlFor="to" id="to-label" className="main__label">
            <span className="main__label-text">To:</span>
            <input type="email" id="to" className="main__input" />
          </label>
          <div className="main__carbon-copy">
            <div className="main__carbon-label">
              <span className="main__label-text">CC:</span>
              <i className="fas fa-plus-circle main__icon" />
            </div>
            <div className="main__carbon-label">
              <span className="main__label-text">BCC:</span>
              <i className="fas fa-plus-circle main__icon" />
            </div>
          </div>
          <textarea
            name="text"
            id="text"
            className="main__textarea"
            placeholder="Enter your ticket's description"
          />
          <label htmlFor="checkbox" className="main__label">
            <input type="checkbox" id="checkbox" className="main__checkbox" />
            <span className="main__label-text">Send ticket as email</span>
          </label>
          <input type="button" className="main__submit" value="Create Ticket" />
        </form>
      </main>
    );
  }
}
