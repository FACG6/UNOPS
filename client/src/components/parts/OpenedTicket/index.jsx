import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import './style.css';

export default function OpenedTicket({
  subject, status, from, cc, body, date,
}) {
  return (
    <section className="opened-ticket">
      <div className="opened-ticket__header">
        <i className="far fa-edit opened-ticket__edit-icon" />
        <span className="opened-ticket__subject">{subject}</span>
        <span className="opened-ticket__status">{status}</span>
      </div>
      <div className="opened-ticket__details">
        <div className="opened-ticket__logo-div">
          <Logo className="opened-ticket__logo" />
        </div>
        <div className="opened-ticket__details-emails-div">
          <span className="opened-ticket__from opened-ticket__details-text">
            <span className="opened-ticket__details-text--strong">From:</span>
            {from}
          </span>
          {cc ? (
            <span className="opened-ticket__cc opened-ticket__details-text">
              <span className="opened-ticket__details-text--strong">CC:</span>
              {cc}
            </span>
          ) : (
            <></>
          )}
          <span className="opened-ticket__date opened-ticket__details-text">
            <span className="opened-ticket__details-text--strong">Date:</span>
            {date}
          </span>
        </div>
      </div>
      <div className="opened-ticket__body" dangerouslySetInnerHTML={{ __html: body }} />
    </section>
  );
}

OpenedTicket.propTypes = {
  subject: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  cc: PropTypes.string,
};

OpenedTicket.defaultProps = {
  cc: null,
};
