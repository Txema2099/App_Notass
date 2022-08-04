require('dotenv').config();
const { PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

//*importaciones de usuarios
const {
  NewUserController,
  getUserController,
  loginUserController,
} = require('./controllers/user');

//*importaciones de notes
const {
  NewNoteController,
  getNotesController,
  getSingleNoteController,
  deleteNoteController,
  ModifyNoteController,
} = require('./controllers/notes');

//*Importacion de autorizacion para crear notes
const { authUser } = require('./middlewares/auth');

const app = express();
//*midelware json y encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'));

//*rutas Users
app.post('/users', NewUserController);
app.get('/users/:id', getUserController);
app.post('/login', loginUserController);

//*Rutas Notes
app.get('/', getNotesController);
app.post('/', authUser, NewNoteController);
app.get('/notes/:id', getSingleNoteController);
//!añadir put para modificacion de otas por login y token se seguridad de las notas
app.put('/note/:id', authUser, ModifyNoteController);

app.delete('/notes/:id', deleteNoteController);

//*middleware de 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

//*middleware de gestion de errores generales
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//*lanzar el servidor
app.listen(PORT, () => {
  console.log('Servidor en Funcionamiento');
});
