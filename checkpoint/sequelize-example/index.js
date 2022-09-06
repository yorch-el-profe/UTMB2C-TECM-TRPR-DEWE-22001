const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './sqlite.db'
});

// Comprobando conexión con SQLite
sequelize
  .authenticate()
  .then(function () {
    console.log('Conectado a SQLite');
  })
  .catch(function () {
    console.error('No se pudo establecer conexión con SQLite');
  });

console.log('Estableciendo conexión...');

// Crear las tablas de mi base de datos

// Definir la estructura de mi tabla
const User = sequelize.define("users", {
  name: DataTypes.STRING(50), // VARCHAR(50)
  birthDate: DataTypes.DATEONLY,
  email: DataTypes.STRING(100),
});

// Crear/Actualizar las tablas en la base de datos
sequelize
  .sync()
  .then(function () {
    console.log('Base de datos sincronizada');
  })
  .catch(function () {
    console.error('No se pudo sincronizar la base de datos');
  });

User.create({
  name: 'Paquito Suarez',
  email: 'paquitosu@gmail.com',
  birthDate: new Date(1982, 5, 20)
})
  .then(function () {
    console.log('Registro creado en la base de datos');
  })
  .catch(function ()  {
    console.error('No se pudo crear el registro');
  });