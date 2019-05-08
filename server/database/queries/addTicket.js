const connect = require('../connection');

const addTicket = (data) => {
  const {
    from, to, bcc, date, text, status, subject, userId,
  } = data;
  const sql = {
    text: 'INSERT INTO tickets (sentby,deliveredto,bcc,dattime,body,statusticket,subjectticket,userid) values($1,$2,$3,$4,$5,$6,$7,$8)',
    values: [from, to, bcc, date, text, status, subject, userId],
  };
  return connect.query(sql);
};
module.exports = addTicket;
