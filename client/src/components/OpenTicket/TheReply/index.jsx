import React from 'react';
import './style.css';

const TheReply = () => (
  <section className="text-reply">
    <h2 className="text-reply__h2-reply">Reply : </h2>
    <div className="text-reply__div-reply">
      <div className="text-reply__div-reply__divicon-reply">
        <h4 className="text-reply__div-reply__name-emailCC">CC:</h4>
        <h5 className="text-reply__div-reply__title_emailCC">cc.email@gmail.com</h5>
        <i className="far fa-plus-square iconCC" />

      </div>
      <div className="iconBCC-reply">
        <h4 className="iconBCC-reply__name-emailBCC">BCC:</h4>
        <h5 className="iconBCC-reply__title-emailBCC">bcc.email@gmail.com</h5>
        <i className="far fa-plus-square iconBCC" />
      </div>
      <textarea className="iconBCC-reply__contentText-area" placeholder="your reply" />
    </div>
    <input type="submit" name="reply" id="btn_reply" value="Reply" />
  </section>

);
export default TheReply;
