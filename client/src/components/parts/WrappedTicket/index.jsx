import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

export default function WrappedTicket({
  from, subject, body, date, allChecked, uid,
}) {
  return (
    <section className="wrapped-ticket">
      <Link to={`/ticket/${uid}`}>
        {allChecked ? (
          <input type="checkbox" className="wrapped-ticket__checkbox" checked />
        ) : (
          <input type="checkbox" className="wrapped-ticket__checkbox" />
        )}
        <span className="wrapped-ticket__from wrapped-ticket__text">{from}</span>
        <span className="wrapped-ticket__subject wrapped-ticket__text">
          {subject.substring(0, 14)}
        </span>
        <span className="wrapped-ticket__description">{body.substring(0, 59)}</span>
        <span className="wrapped-ticket__date wrapped-ticket__text">{date}</span>
      </Link>
    </section>
  );
}

WrappedTicket.propTypes = {
  from: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  allChecked: PropTypes.bool,
};

WrappedTicket.defaultProps = {
  allChecked: false,
};
