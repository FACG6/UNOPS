import React, { Component } from 'react';
import './style.css';
import Logo from '../Logo';


export default class extends Component {
  state = {
    email: '',
    password: '',
    msg:''
  };

   
  onSubmit = event => {
    event.preventDefault();
    console.log(event.target.email.value);
    const requestInfo = {
      emailValue: event.target.email.value,

      passwordValue: event.target.password.value
    }
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify(requestInfo),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(({msg}) => {
     this.setState({msg:'login successfully'});
    });
  }
  render() {
    return (
      <div className="login">
        <main className="login__main">
          <section className="login__header">
            <Logo className="login__logo" />
            <span className="login__logo-text login__logo-text--white">UN</span>
            <span className="login__logo-text login__logo-text--black">OPS</span>
          </section>
          <form onSubmit={this.onSubmit} className="login__form">
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
            <span className="message">{this.state.msg}</span>
          </form>
        </main>
      </div>
    );
  }

}
