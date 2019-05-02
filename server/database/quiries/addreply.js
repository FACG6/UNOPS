const connect = require('../connection');
let date=new Date();
console.log(date)
const addNewReply = (from ,to ,bcc,date,text,status,subject,userId,reply) => {
    const sql = {
        text:'INSERT INTO tickets (sentby,deliveredto,bcc,dattime,body,statusticket,subjectticket,userid,reply) values($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      values : [from ,to ,bcc,date,text,status,subject,userId,reply]
    }
    return connect.query(sql);
  };  
  addNewReply('jamalat@gmail.com','jama@gmail.com','jkdd','2019-05-02T11:17:54.083Z','reply','pending','reply',1,true).then(()=>console.log('done')).catch(e =>
      console.log(e));
 const adduser =(email,name,password)=>{
    const sql={
        text:'insert into users (email,name,password)values($1,$2,$3)',
        values:[name,email,password]
    }
    return connect.query(sql)
 }
//  adduser('jsjamala@gmail.com',"jaa",'123').then(()=>console.log('done')).catch((e)=>console.log(e))

