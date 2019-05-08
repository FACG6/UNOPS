const connect = require('../connection');

const getReplies = (msgId) => {
  const sql = {
    text: 'select * from replies where inReplyTo=$1',
    values: [msgId],
  };
  return connect.query(sql).then(res => res.rows);
};
module.exports = getReplies;
