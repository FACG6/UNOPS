import React from "react";

export default function EmailCopy({ add, type, copy, addNew, toggleAdd }) {
  return (
    <>
      {add ? (
        <div className={`reply-section__copies-${type}`}>
          {type.toUpperCase()}:
          <input
            type="email"
            className="reply-section__copies-input reply-section__input"
            onKeyPress={event => addNew(event, type)}
          />
          {copy.length ? (
            copy.map(email => (
              <span className="reply-section__copies-email">{email}</span>
            ))
          ) : (
            <></>
          )}
          <i className="far fa-plus-square reply-section__plus-icon" />
        </div>
      ) : (
        <div className="reply-section__copies-cc">
          {type.toUpperCase()}:
          {copy.length ? (
            copy.map(email => (
              <span className="reply-section__copies-email">{email}</span>
            ))
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
