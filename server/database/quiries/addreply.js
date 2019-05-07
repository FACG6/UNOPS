const connect = require('../connection');
let date=new Date();
console.log(date)
const addNewReply = () => {
    const{from ,to ,bcc,date,text,status,subject,userId,inReplyTo,reply}= data
    const sql = {
        text:'INSERT INTO replies (sentby,deliveredto,bcc,dattime,body,statusticket,subjectticket,userid,inReplyTo,reply) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
      values : [from ,to ,bcc,date,text,status,subject,userId,inReplyTo,reply]
    }
    return connect.query(sql);
  };  
 
module.exports = addNewReply;
