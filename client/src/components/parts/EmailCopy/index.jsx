import React from 'react';
import PropTypes from 'prop-types';

export default function EmailCopy({
  add, type, copy, addNew, toggleAdd,
}) {
  return (
    <>
      {add ? (
        <div className={`reply-section__copies-${type}`}>
          {type.toUpperCase()}
          :
          <input
            type="email"
            className="reply-section__copies-input reply-section__input"
            onKeyPress={event => addNew(event, type)}
          />
          {copy.length ? (
            copy.map(email => <span className="reply-section__copies-email">{email}</span>)
          ) : (
            <></>
          )}
          <i className="far fa-plus-square reply-section__plus-icon" />
        </div>
      ) : (
        <div className="reply-section__copies-cc">
          {type.toUpperCase()}
:
          {copy.length ? (
            copy.map(email => <span className="reply-section__copies-email">{email}</span>)
          ) : (
            <></>
          )}
          <i
            className="far fa-plus-square reply-section__plus-icon"
            onClick={() => toggleAdd(type)}
          />
        </div>
      )}
    </>
  );
}

EmailCopy.propTypes = {
  add: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  copy: PropTypes.instanceOf(Array).isRequired,
  addNew: PropTypes.instanceOf(Function).isRequired,
  toggleAdd: PropTypes.instanceOf(Function).isRequired,
};
