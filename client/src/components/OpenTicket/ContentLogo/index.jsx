import React from 'react';
import './style.css';

const TickectSubject = () => (
  <div className="content-ticket">
    <div className="content-ticket__div-from">
      <p className="content-ticket__p-from">
                    From:
        {' '}
      </p>
      <span className="content-ticket__span-from">senderemail@gmail.com</span>
    </div>
    <div className="div-cc">
      <p className="div-cc__p-cc">
                    CC:
        {' '}
      </p>
      <span className="div-cc__span-cc">cc.email@gmail.com</span>
    </div>
    <div className="div-bcc">
      <p className="div-bcc__p-bcc">
                    BCC :
        {' '}

      </p>
      <span className="div-bcc__span-bcc">bcc.email@gmail.com</span>
    </div>
  </div>
);
export default TickectSubject;
