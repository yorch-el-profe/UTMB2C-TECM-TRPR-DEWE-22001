const mongoose = require('mongoose');

// 1. Establecer conexión con la base de datos
mongoose
  .connect('...', function (err) {
    if (err) {
      console.error('No se pudo conectar a la base de datos');
      console.error(err);
    } else {
      console.log('Conectado a Mongo Atlas');
    }
  });

// 2. Establecer un modelo de datos (schema)
/*
  User: email, username, password
  Post: content, user

  Si esto fuera SQL...
  CREATE TABLE users (
    id INT PRIMARY_KEY,
    email VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR(15)
  );
*/
const UserSchema = new mongoose.Schema({
  email: { type: String, maxlength: 50, unique: true },
  username: { type: String, maxlength: 50, unique: true },
  password: { type: String, maxlength: 15, minlength: 8 }
});

/*
  CREATE TABLE posts (
    id INT PRIMARY_KEY,
    content TEXT,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES users(id)
  );
*/
const PostSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});

// 3. Crear instancias de los schemas
const UserModel = mongoose.model('users', UserSchema);
const PostModel = mongoose.model('posts', PostSchema);

new UserModel({
  email: 'jose@gmail.com',
  username: 'jose_123',
  password: '123123123'
}).save(function (err, document) {
  if (err) {
    console.error('No se pudo registrar en la base de datos');
    console.error(err);
  } else {
    console.log('Documento insertado en la base de datos');
    console.log(document);
  }
});