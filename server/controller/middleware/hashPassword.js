const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  bcrypt.hash(password, 5).then(hashedPassword => console.log(hashedPassword));
};
hashPassword('11111');
