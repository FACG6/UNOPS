import React, { Component } from 'react';
import './style.css';
import Logo from '../Logo';

export default class extends Component {
  state = {
    email: '',
    password: '',
    msg:''
  };
  handelChange = ({ target: { name, value } }) => {
    this.setState({msg:''})
    if(name ==="email"&& !value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
    this.setState({ msg: "enter valid email" })
    else if (name ==="email"&& value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
    this.setState({[name]:value})
     else if (name === "password") this.setState({[name]:value})
    else return ""
  }
  handelSubmit = (e) => {
    this.setState({msg:''})
    e.preventDefault();
    const { email, password } = this.state
    if(!email || !password) this.setState({msg: "please fill all fields"})
    else {
    fetch('/api/login', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({email,password})
    }).then(res =>  res.json())
    .then(res => {
      if(res.statusCode !== 200) 
    this.setState({msg:res.msg})
     else console.log(res)
  })}

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
          <form action="" className="login__form" >
            <label htmlFor="email" className="login__label">
              <span className="login__label-text">
                Email:
                {' '}
                <span className="required">*</span>
              </span>
              <input name="email" type="email" id="email" className="login__input" onChange={this.handelChange} />
            </label>
            <label htmlFor="password" className="login__label">
              <span className="login__label-text">
                Password:
                {' '}
                <span className="required">*</span>
              </span>
              <input type="password" id="password" className="login__input" name="password" onChange={this.handelChange} />
            </label>
            <span className="login__msg">{this.state.msg}</span>
            <input type="submit" className="login__submit" value="Login" onClick={this.handelSubmit} />
            
          </form>
        </main>
      </div>
    );
  }
}
