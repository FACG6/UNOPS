const connect = require('../connection');
let date=new Date();
console.log(date)
const addNewReply = (data) => {
    const {from ,to ,bcc,date,text,status,subject,userId,reply} = data;
    const sql = {
        text:'INSERT INTO tickets (sentby,deliveredto,bcc,dattime,body,statusticket,subjectticket,userid,reply) values($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      values : [from ,to ,bcc,date,text,status,subject,userId,reply]
    }
    return connect.query(sql);
  };  
module.exports = addNewReply;
