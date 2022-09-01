require('dotenv').config();

const {connect, Schema, model, Types} = require('mongoose');
const {createServer} = require('http');

connect(process.env.MONGO_URI, function (err) {
  if (err) {
    console.error('No se pudo conectar a la base de datos');
    console.error(err);
    process.exit(1); // Cierra el proceso de manera erronea
  } else {
    console.log('Conectado a la base de datos');
  }
});

const PostSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'users' }
});

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

const PostModel = model('posts', PostSchema);
const UserModel = model('users', UserSchema);

/**
 * El plan es el siguiente:
 * 
 * Si alguien consulta la url /publicaciones entonces regresamos todas las
 * publicaciones de la base de datos.
 * 
 * 
 * Si alguien consulta la url /publicaciones/usuarios/id entonces regresamos
 * todas las publicaciones de ese usuario en particular.
 * 
 * Por ejemplo: /publicaciones/usuarios/630ffe6d77f654e4b91fc0e0
 */
const server = createServer(function (request, response) {
  if (request.url === '/publicaciones') {
    PostModel.find().populate('author').exec(function (err, posts) {
      if (err) {
        response.write('Ocurrió un error al procesar tu solicitud');
        console.error(err);
        response.end();
      } else {
        response.write(JSON.stringify(posts));
        response.end();
      }
    });
  } else if (request.url.startsWith('/publicaciones/usuarios/')) {
    const split = request.url.split('/');
    const userId = split[3];
    PostModel.find({ author: Types.ObjectId(userId) }, function (err, posts) {
      if (err) {
        response.write('Ocurrió un error al procesar tu solicitud');
        console.error(err);
        response.end();
      } else {
        response.write(JSON.stringify(posts));
        response.end();
      }
    });
  } else {
    response.write('Error 404: No se encontro lo que buscabas');
    response.end();
  }
});

server.listen(8080, function () {
  console.log('Servidor escuchando en el puerto 8080');
});