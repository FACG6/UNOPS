import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function WrappedTicket({
  from, subject, description, date, allChecked,
}) {
  return (
    <section className="wrapped-ticket">
      {allChecked ? (
        <input type="checkbox" className="wrapped-ticket__checkbox" checked />
      ) : (
        <input type="checkbox" className="wrapped-ticket__checkbox" />
      )}
      <span className="wrapped-ticket__from wrapped-ticket__text">{from}</span>
      <span className="wrapped-ticket__subject wrapped-ticket__text">
        {subject.length > 19 ? `${subject.substring(0, 19)}...` : subject}
      </span>
      <span className="wrapped-ticket__description">
        {description.length > 64 ? `${description.substring(0, 64)}...` : description}
      </span>
      <span className="wrapped-ticket__date wrapped-ticket__text">{date}</span>
    </section>
  );
}

WrappedTicket.propTypes = {
  from: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  allChecked: PropTypes.bool,
};

WrappedTicket.defaultProps = {
  allChecked: false,
};
