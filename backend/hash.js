
const bcrypt = require('bcryptjs');
const fs = require('fs');

const password = '1234';

bcrypt.hash(password, 10).then(hash => {
  console.log('Hash:', hash);

  const fs = require('fs');
  const user = {
    email: 'admin@test.com',
    password: hash  
  };

  fs.writeFileSync('./users.json', JSON.stringify([user], null, 2)); 
  console.log('The password was hashed and stored in users.json');
}).catch(err => {
  console.log('Error:', err);
});
