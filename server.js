require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const {
  NewUserController,
  getUserController,
  loginUserController,
} = require('./controllers/user');

const app = express();

app.use(morgan('dev'));
//rutas Users
app.post('/user', NewUserController);
app.get('./user/:id', getUserController);
app.post('/login', loginUserController);

//Rutas Notes
app.get('/', getNoteController);

//middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

//middleware de gestion de errores generales
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//lanzar el servidor
app.listen(3000, () => {
  console.log('Servidor en Funcionamiento');
});
