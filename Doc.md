Socket.io connection api:

1-to fetch the emails for the first time you need to perform an event like (eg. 
        socket.on('request getmails', ()=> { 
        socket.emit('getmails', {range: (for example:) '1:5'});})
        
2-to search for messages by keywords:
        socket.emit('search', {keyword:'pending'});
        socket.on('search result', (result) => {
          console.log('search result',result)
        })
        
3-to listen for every new mail you need to emit an event like 
      socket.on('notification', () => {
      console.log('notification');
      socket.emit('get new mail')
    });
and then receive the mail using this event:
    socket.on('new mail', (newMail) => {
      console.log('new mail', newMail);
    });

4-to update the status of an email use the following event:
      socket.emit('update status', {uid:135, status:'pending'}).

5-to create a new ticket and store it in the database use the following event, 
      socket.emit('new ticket', {ticket details obj. to be stored in the database}

6-to send a new message use the following event(this will store the ticket in the database and send an email):
     socket.on('send a new message', {ticket details obj. to be sent}).

7-to get the statistics data from the database use the following event:
     socket.emit('reports', the time period).
