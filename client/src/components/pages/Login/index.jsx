import React, { Component } from 'react';
import './style.css';
import Logo from '../../parts/Logo';

export default class extends Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <div className="login">
        <main className="login__main">
          <section className="login__header">
            <Logo className="login__logo" />
            <span className="login__logo-text login__logo-text--white">UN</span>
            <span className="login__logo-text login__logo-text--black">OPS</span>
          </section>
          <form action="" className="login__form">
            <label htmlFor="email" className="login__label">
              <span className="login__label-text">
                Email:
                {' '}
                <span className="required">*</span>
              </span>
              <input type="email" id="email" className="login__input" />
            </label>
            <label htmlFor="password" className="login__label">
              <span className="login__label-text">
                Password:
                {' '}
                <span className="required">*</span>
              </span>
              <input type="password" id="password" className="login__input" />
            </label>
            <input type="button" className="login__submit" value="Login" />
          </form>
        </main>
      </div>
    );
  }
}
