const app = require('./app.js');

app.listen(app.get('port'), app.get('host') || 'localhost', () => console.log(`Server is up on http://${app.get('host')}:${app.get('port')}`));
