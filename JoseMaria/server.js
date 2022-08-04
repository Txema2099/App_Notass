require(`dotenv`).config();
const express = require(`express`);
//const res = require('express/lib/response');
const morgan = require(`morgan`);
const fileUpload = require(`express-fileupload`);

const {
  newUserCoontroller,
  getUserController,
  loginController,
} = require(`./controllers/usuarios`);

const {
  getNoteController,
  newNoteController,
  getSimpleNoteController,
  deleteNoteController,
} = require(`./controllers/notas`);

const { authUser } = require(`./middlewares//auth`);

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(morgan(`dev`));

//Rutas de ususario
app.post(`/usuario`, newUserCoontroller);
app.get(`/usuario/:id`, getUserController);
app.post(`/login`, loginController);

//Rutas de notas
app.post(`/`, authUser, newNoteController),
  app.get(`/`, getNoteController),
  app.get(`/nota/:id`, getSimpleNoteController),
  app.delete(`/nota/:id`, authUser, deleteNoteController);

//Middleware 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

//Middelware de gestion de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//Lanzamos el servidor
app.listen(3000, () => {
  console.log(`Servidor funcionando🌍`);
});
