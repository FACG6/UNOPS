import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function ReplyCard({
  from, reply, user, cc, bcc,
}) {
  return (
    <section className="reply-card">
      <div className="reply-card__header">
        <span className="reply-card__from reply-card__text">
          <span className="reply-card__text--strong">From:</span>
          {from}
        </span>
        {user ? (
          <span className="reply-car__user reply-card__text">
            <span className="reply-card__text--strong">User:</span>
            {user}
          </span>
        ) : (
          <></>
        )}
        {cc || bcc ? (
          <div className="reply-card__copies-div">
            {cc ? (
              <span className="reply-card__cc reply-card__text">
                <span className="reply-card__text--strong">CC:</span>
                {cc}
              </span>
            ) : (
              <></>
            )}
            {bcc ? (
              <span className="reply-card__bcc reply-card__text">
                <span className="reply-card__text--strong">BCC:</span>
                {bcc}
              </span>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="reply-card__body-div">
        <span className="reply-card__text--strong">Reply:</span>
        <p className="reply-card__body">{reply}</p>
      </div>
    </section>
  );
}

ReplyCard.propTypes = {
  from: PropTypes.string.isRequired,
  reply: PropTypes.string.isRequired,
  user: PropTypes.string,
  cc: PropTypes.string,
  bcc: PropTypes.string,
};

ReplyCard.defaultProps = {
  user: null,
  cc: null,
  bcc: null,
};
