import React, { Component } from "react";
import "./style.css";
import { ReactComponent as Logo } from "./../../logo.svg";

export default class extends Component {
  state = {
    email: "",
    password: ""
  };

  render() {
    return (
      <div className="container">
        <main className="main">
          <section className="header">
            <Logo />
            <span className="logo-text">
              <span className="logo-text--white">UN</span>
              <span className="logo-text--black">OPS</span>
            </span>
          </section>
          <form action="" className="form">
            <label htmlFor="" className="email-label label">
              <span className="label-text">
                Email: <span className="required">*</span>
              </span>
              <input type="text" className="email-input input" />
            </label>
            <label htmlFor="" className="password-label label">
              <span className="label-text">
                Password: <span className="required">*</span>
              </span>
              <input type="password" className="password-input input" />
            </label>
            <input type="button" className="submit" value="Login" />
          </form>
        </main>
      </div>
    );
  }
}
