import React, { Component } from 'react';
import './style.css';

export default class TheRely extends Component {
  render() {
		return (
			<section className="tex_reply">
				<h2 className="reply">Reply : </h2>
				<div className="content_reply">
					<div className="icon_reply">
					<h4 className="name_email1">CC:</h4>
					<h5 className="title_email1" >cc.email@gmail.com</h5>
					<h4 className="name_email2">BB:</h4>
					<h5 className="title_email2">bb.email@gmail.com</h5>
					</div>
					<textarea className="contentText-area">
					Yeah I also thought so, I recommend you do it the other way that I suggessted.
					Anyway Don’t worry we will be solving the problem ver soon.
					</textarea>
				</div>
				<input type="submit" name="reply" id="btn_reply" />
			</section>
		// eslint-disable-next-line no-tabs
		);
  }
}
