const connect = require('../connection');

const addNewReply = (data) => {
  const {
    from, to, bcc, date, text, status, subject, userId, inReplyTo,
  } = data;
  const sql = {
    text: 'INSERT INTO replies (sentby,deliveredto,bcc,dattime,body,statusticket,subjectticket,userid,inReplyTo) values($1,$2,$3,$4,$5,$6,$7,$8,$9)',
    values: [from, to, bcc, date, text, status, subject, userId, inReplyTo],
  };
  return connect.query(sql);
};
module.exports = addNewReply;
