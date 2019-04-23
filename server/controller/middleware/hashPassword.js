const bcrypt = require('bcryptjs');

const hashpassword = (password) => {
  bcrypt.hash(password, 5).then(hashedpassword => console.log(hashedpassword));
};
hashpassword('123');
