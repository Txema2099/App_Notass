require('dotenv').config();
const { PORT } = process.env;
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

//*importaciones de usuarios
const {
  NewUserController,
  getUserController,
  loginUserController,
  getMeController,
  getUserNotesController,
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
const { CantEdit } = require('./middlewares/CantEdit');

const app = express();

//*midelware json y encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(morgan('dev'));
//*Middleware para hacer la imagen estatica
app.use('/uploads', express.static('uploads'));

//*rutas Users
app.post('/users', NewUserController);
app.get('/users/:id', authUser, getUserController);
app.post('/login', loginUserController);
app.get('/user', authUser, getMeController);
app.get('/users/:id/notes', authUser, getUserNotesController);

//*Rutas Notes

//*endpoint para lista de notas publicas sin autorizacion de usuario global
app.get('/notes', getNotesController);
app.post('/notes', authUser, NewNoteController);
app.get('/notes/:id', authUser, getSingleNoteController);
//*put para modificacion de otras por login y token se seguridad de las notas
app.put('/notes/:id', authUser, CantEdit, ModifyNoteController);

app.delete('/notes/:id', authUser, CantEdit, deleteNoteController);

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
