const connect = require('../connection');

const getReplies = (msgId) => {
  const sql = {
    text: 'select * from replies where reference=$1',
    values: [msgId],
  };
  connect.query(sql).then(res => res.rows);
};
module.exports = getReplies;
