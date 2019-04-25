import React, { Component } from 'react';
import './style.css';
import Logo from '../Logo'

export default class Login extends Component {
    state = {
        emailValue:'',
        passwordValue:'',
        msg:''
    }
    onSubmit = event => {
        event.preventDefault();
       this.setState({emailValue: event.target.email.value,passwordValue: event.target.password.value});
        const {emailValue,passwordValue}=this.state;
        fetch('/login', {
          method: 'POST',
          body: JSON.stringify({emailValue,passwordValue}),
          headers: {
            'content-type': 'application/json'
          }
        })
        .then(res=>res.json())
        .then(res => {
            console.log(res)
            if(res !=='add successfully')
                this.setState({msg:res});
            else this.setState({msg:res})
        });
    }
  render(){
      return(
         <section className="login">
             <main className="login_main">
                <div className="header_logo">
                    <Logo className="login_logo" />
                    <span className="UN">UN</span>
                    <span className="OPS">OPS</span>
                </div>
                <form onSubmit={this.onSubmit} className="login_form">
                <label htmlFor="email" className="login_label">
                    <span className="text_labelEmail">
                        Email
                        <span className="required">*</span>
                    </span>
                    <input type="email" id="email"  name = "email" className="login_inputEmail" onValidation={this.handleValidation}/>
                </label>
                <label htmlFor="password" className="login_label">
                    <span className="text_labelPassword">
                        password
                        <span className="required">*</span>
                    </span>
                    <input type="password" id="password" name = "password" className="login_inputPass"/>
                </label>
                <input type="submit" className="login__submit" value="Login" />
            <span className="message">{this.state.msg}</span>
                </form>
             </main>
         </section>
      )
  }
}