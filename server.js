require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const {
  NewUserController,
  getUserController,
  loginUserController,
} = require('./controllers/user');

const {
  NewNoteController,
  getNotesController,
  getSingleNoteController,
  deleteNoteController,
} = require('./controllers/notes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
//rutas Users
app.post('/users', NewUserController);
app.get('./users/:id', getUserController);
app.post('/login', loginUserController);

//Rutas Notes
app.get('/', getNotesController);
app.post('/', NewNoteController);
app.get('/notes/:id', getSingleNoteController);
app.delete('/notes/:id', deleteNoteController);

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
