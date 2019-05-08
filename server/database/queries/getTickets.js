const connection = require('../connection');

module.exports = () => connection
  .query(
    'SELECT uid, sent_by, delivered_to, date_time as date, body as html, status, subject, users.name as user FROM tickets JOIN users ON tickets.user_id = users.id',
  )
  .then(res => res.rows);
