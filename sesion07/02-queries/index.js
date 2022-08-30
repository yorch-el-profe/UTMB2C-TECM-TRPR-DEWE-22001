const { connect, Schema, model } = require('mongoose');

connect('...', function (err) {
  if (err) {
    console.error('No se pudo conectar a la base de datos');
    console.error(err);
  } else {
    console.log('Conectado a Mongo Atlas');
  }
});

const UserSchema = new Schema({
  email: { type: String, maxlength: 50, unique: true },
  username: { type: String, maxlength: 50, unique: true },
  password: { type: String, maxlength: 15, minlength: 8 }
});

const UserModel = model('users', UserSchema);

// SELECT * FROM users;
/*UserModel.find(function (err, result) {
  if (err) {
    console.error('No se puede realizar consulta en base de datos');
    console.error(err);
  } else {
    console.log(result);
  }
});*/

// SELECT * FROM table WHERE field1 = 'a' AND field2 = 'b' -> { field1: 'a', field2: 'b' }
// SELECT * FROM table WHERE field1 = 1 OR field2 = 2 -> { $or: [{ field1: 1 }, { field2: 2 }] }
// SELECT * FROM users WHERE username = 'paquito_48'; -> { username: 'paquito_48' }
UserModel.findOne({ username: 'paquito_48' }, function (err, result) {
  if (err) {
    console.error('No se puede realizar consulta en base de datos');
    console.error(err);
  } else {
    console.log(result);
  }
});