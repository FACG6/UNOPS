import React from 'react';
import './style.css';

const TheReply = () => (
  <section className="text_reply">
    <h2 className="reply">Reply : </h2>
    <div className="content_reply">
      <div className="icon1_reply">
        <h4 className="name_email1">CC:</h4>
        <h5 className="title_email1">cc.email@gmail.com</h5>
        <i className="far fa-plus-square icon1" />

      </div>
      <div className="icon2_reply">
        <h4 className="name_email2">BB:</h4>
        <h5 className="title_email2">bb.email@gmail.com</h5>
        <i className="far fa-plus-square icon2" />
      </div>
      <textarea className="contentText-area">

        Yeah I also thought so, I recommend you do it the other way that I suggessted.
                  Anyway Don’t worry we will be solving the problem ver soon.


      </textarea>
    </div>
    <input type="submit" name="reply" id="btn_reply" value="Reply" />
  </section>

);
export default TheReply;
