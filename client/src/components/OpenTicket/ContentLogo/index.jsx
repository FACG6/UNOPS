import React from 'react';
import './style.css';

const TickectSubject = () => (
  <div className="content_ticket">
    <div className="div_from">
      <p className="h5_from">
                    From:
        {' '}
      </p>
      <span className="span_from">senderemail@gmail.com</span>
    </div>
    <div className="div_cc">
      <p className="h5_cc">
                    CC:
        {' '}
      </p>
      <span className="span_cc">cc.email@gmail.com</span>
    </div>
    <div className="div_bcc">
      <p className="h5_bcc">
                    BCC :
        {' '}

      </p>
      <span className="span_bcc">bcc.email@gmail.com</span>
    </div>
  </div>
);
export default TickectSubject;
