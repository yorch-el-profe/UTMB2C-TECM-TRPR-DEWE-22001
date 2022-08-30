/*
  Destructuring

  const obj = {
    a: 0,
    b: 1,
    c: 2
  }

  const arr = [0, 1, 2]

  Antes:
    const a = obj.a;
    const b = obj.b;
    const c = obj.c;

    const arr1 = arr[0];
    const arr2 = arr[1];

  Utilizando el destructuring:
    const {a, b, c} = obj;
    const [arr1, arr2, arr3] = arr;


  Para fs:

  const fs = require('node:fs');
  fs.readFile(...)


  const {readFile} = require('node:fs');
  readFile(...)
*/
// import { readFile } from 'node:fs';
const {readFile} = require('node:fs');

readFile('./hello_world.txt', 'utf-8', function (err, text) {
  if (err) {
    console.error('Error al abrir el archivo');
  } else {
    console.log(text);
  }
});