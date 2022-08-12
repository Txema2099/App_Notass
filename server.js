require(`dotenv`).config();
const { PORT } = process.env;
const express = require(`express`);
const morgan = require(`morgan`);
const fileUpload = require(`express-fileupload`);

const {
  newUserCoontroller,
  getUserController,
  loginUserController,
} = require(`./controllers/user`);

const {
  getNotesController,
  newNoteController,
  getSingleNoteController,
  deleteNoteController,
  ModifyNoteController,
} = require(`./controllers/notes`);
//Importo autorización para crear notas
const { authUser } = require(`./middlewares/auth`);
//const { CantEdit } = require("./middlewares/CantEdit");

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(morgan(`dev`));
//Middleware para hacer la imagen estatica
app.use(express.static(`uploads`));
app.use(express.urlencoded({ extended: true }));
//Rutas de users
app.post(`/users`, newUserCoontroller);
app.get(`/users/:id`, getUserController);
app.post(`/login`, loginUserController);

//Rutas de notes
app.get(`/`, getNotesController),
  //incluyo en el post CanEdit entre las 2 fx previamnet existentes
  app.post(`/`, authUser, newNoteController),
  app.get(`/notes/:id`, getSingleNoteController),
  //siguiente linea incluyo CantEdit la fx previamente existetesdit
  app.put("/notes/:id", authUser, ModifyNoteController);
//siguiente linea incluyo CantEdit la fx previamente existetesdit
app.delete(`/notes/:id`, authUser, deleteNoteController);
//Middleware 404
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Not found",
  });
});

//Middelware de gestion de errores
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: "error",
    message: error.message,
  });
});

//Lanzamos el servidor
app.listen(3000, () => {
  console.log(`Servidor funcionando🌍`);
});
