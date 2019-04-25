import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Reply extends Component {
  state = {
    cc: [],
    bcc: [],
    addCc: false,
    addBcc: false,
    reply: '',
  };
  toggleAdd = target => {
    target = target === 'cc' ? 'addCc' : 'addBcc';
    this.setState({ [target]: !this.state[target] });
  };
  addNew = event => {
    const target = event.target.parentNode.classList.contains('reply-section__copies-cc')
      ? 'cc'
      : 'bcc';
    if (event.charCode == 13) {
      if (!event.target.value) this.toggleAdd(target);
      else
        this.setState({ [target]: [...this.state[target], event.target.value] }, () =>
          this.toggleAdd(target),
        );
    }
  };

  render() {
    const { cc, bcc, addCc, addBcc } = this.state;
    return (
      <section className="reply-section">
        <div className="reply-section__text">Reply:</div>
        <div className="reply-section__reply-form">
          <div className="reply-section__copies">
            {addCc ? (
              <div className="reply-section__copies-cc">
                CC:
                <input
                  type="email"
                  className="reply-section__copies-input reply-section__input"
                  onKeyPress={this.addNew}
                />
                {cc.length ? (
                  cc.map(email => <span className="reply-section__copies-email">{email}</span>)
                ) : (
                  <></>
                )}
                <i className="far fa-plus-square reply-section__plus-icon" />
              </div>
            ) : (
              <div className="reply-section__copies-cc">
                CC:
                {cc.length ? (
                  cc.map(email => <span className="reply-section__copies-email">{email}</span>)
                ) : (
                  <></>
                )}
                <i
                  className="far fa-plus-square reply-section__plus-icon"
                  onClick={() => this.toggleAdd('cc')}
                />
              </div>
            )}
            {addBcc ? (
              <div className="reply-section__copies-bcc">
                BCC:
                <input
                  type="email"
                  className="reply-section__copies-input reply-section__input"
                  onKeyPress={this.addNew}
                />
                {bcc.length ? (
                  bcc.map(email => <span className="reply-section__copies-email">{email}</span>)
                ) : (
                  <></>
                )}
                <i className="far fa-plus-square reply-section__plus-icon" />
              </div>
            ) : (
              <div className="reply-section__copies-bcc">
                BCC:
                {bcc.length ? (
                  bcc.map(email => <span className="reply-section__copies-email">{email}</span>)
                ) : (
                  <></>
                )}
                <i
                  className="far fa-plus-square reply-section__plus-icon"
                  onClick={() => this.toggleAdd('bcc')}
                />
              </div>
            )}
          </div>
          <textarea className="reply-section__reply-field" />
          <div className="reply-section__submit">Reply</div>
        </div>
      </section>
    );
  }
}
