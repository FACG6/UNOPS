import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import './style.css';

const classes = {
  pdf: { icon: 'far fa-file-pdf', general: 'opened-ticket__attachment-link--pdf' },
  doc: { icon: 'far fa-file-word', general: 'opened-ticket__attachment-link--word' },
  docx: { icon: 'far fa-file-word', general: 'opened-ticket__attachment-link--word' },
  csv: { icon: 'far fa-file-excel', general: 'opened-ticket__attachment-link--excek' },
  png: { icon: 'far fa-file-image', general: 'opened-ticket__attachment-link--img' },
  jpg: { icon: 'far fa-file-image', general: 'opened-ticket__attachment-link--img' },
  jpeg: { icon: 'far fa-file-image', general: 'opened-ticket__attachment-link--img' },
  gif: { icon: 'far fa-file-image', general: 'opened-ticket__attachment-link--img' },
  svg: { icon: 'far fa-file-image', general: 'opened-ticket__attachment-link--img' },
  txt: { icon: 'far fa-file-alt', general: 'opened-ticket__attachment-link--text' },
};

export default function OpenedTicket({
  subject, status, from, cc, body, date, attachments,
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
      {attachments ? (
        <div className="opened-ticket__attachments-div">
          {attachments.map(attachment => (
            <a
              download={attachment.fileName}
              href={`data:application/octet-stream;base64,${attachment.content.data}`}
              className={`${
                classes[attachment.fileName.split('.')[1]].general
              } opened-ticket__attachment-link`}
            >
              <i
                className={`${
                  classes[attachment.fileName.split('.')[1]].icon
                } opened-ticket__attachment-icon`}
              />
              <span className="opened-ticket__attachment-name">{attachment.fileName}</span>
            </a>
          ))}
        </div>
      ) : (
        <></>
      )}
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
