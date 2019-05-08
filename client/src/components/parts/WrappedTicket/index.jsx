import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

export default function WrappedTicket({
  from,
  subject,
  text,
  date,
  allChecked,
  uid,
  isChecked,
  toggleCheck,
}) {
  console.log('texttttttt', text);
  return (
    <section className="wrapped-ticket">
      {isChecked || allChecked ? (
        <input
          type="checkbox"
          className="wrapped-ticket__checkbox"
          checked
          onClick={() => toggleCheck(uid)}
        />
      ) : (
        <input
          type="checkbox"
          className="wrapped-ticket__checkbox"
          onClick={() => toggleCheck(uid)}
          value="checked"
        />
      )}
      <Link to={`/ticket/${uid}`}>
        <span className="wrapped-ticket__from wrapped-ticket__text">{from}</span>
        <span className="wrapped-ticket__subject wrapped-ticket__text">
          {subject.length > 17 ? `${subject.substring(0, 17)}...` : subject}
        </span>

        <span className="wrapped-ticket__description">
          {text.length > 59 ? `${text.substring(0, 59)}...` : text}
        </span>
        <span className="wrapped-ticket__date wrapped-ticket__text">{date}</span>
      </Link>
    </section>
  );
}

WrappedTicket.propTypes = {
  from: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  allChecked: PropTypes.bool,
};

WrappedTicket.defaultProps = {
  allChecked: false,
};
