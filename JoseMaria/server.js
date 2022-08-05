require(`dotenv`).config();
const { PORT } = process.env;
const express = require(`express`);
const morgan = require(`morgan`);
//const fileUpload = require(`express-fileupload`);

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
const { authUser } = require(`./middlewares//auth`);

const app = express();

//app.use(fileUpload());
app.use(express.json());
app.use(morgan(`dev`));
//app.use(express.urlencoded({ extended: true }));
//Rutas de users
app.post(`/users`, newUserCoontroller);
app.get(`/users/:id`, getUserController);
app.post(`/login`, loginUserController);

//Rutas de notes
app.get(`/`, getNotesController),
  app.post(`/`, authUser, newNoteController),
  app.get(`/notes/:id`, getSingleNoteController),
  app.delete(`/notes/:id`, authUser, deleteNoteController);
app.put("/note/:id", authUser, ModifyNoteController);
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
app.listen(PORT, () => {
  console.log(`Servidor funcionando🌍`);
});
