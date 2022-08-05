//importo fx de ../db/notas
const {
  createNote,
  getAllNotas,
  getNotaByid,
  deleteNotaBiId,
} = require("../db/Gnotes");
const { generateError } = require("../helpfun");
const path = require(`path`);

const newNoteController = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || text.length > 300) {
      throw generateError(
        "El texto de la nota debe existir y ser menor de 300 caracteres",
        400
      );
    }

    //Procesado imagen imagen
    //    let imageFilename;
    //    if (req.files && req.files.image);
    //Creo el path del directorio uploads
    //    const uploadsDir = path.join(__dirname, `../uploads`);
    //    console.log(uploadsDir);
    //Creo el directorio si no existe

    //Guardo al imagen con nombre aleatorio en el directorio uploads

    const id = await createNote(req.userId, text);

    res.send({
      status: "ok",
      message: `Nota con id: ${id} creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

//!crear una gestion de funcion async para gestion de modifinote
const ModifyNoteController = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || text.length > 300) {
      throw generateError(
        "Debe escribir texto en la nota y ser menos de 300 caracteres",
        400
      );
    }

    const id = await ModifyNote(req.userId, text);

    res.send({
      status: "ok",
      message: "Su nota a sido modificada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

const getSingleNoteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const nota = await getNotaByid(id);
    res.send({
      status: `ok`,
      message: nota,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNoteController = async (req, res, next) => {
  try {
    const { id } = req.params;

    // sacar info de la nota que quiero borrar
    const nota = await getNotaByid(id);

    //comprobar que le usuario del token creó la nota
    if (req.userId !== nota.userId) {
      throw generateError(
        `Estás tratando de borrar una nota no escrita pot tí`,
        401
      );
    }
    //Borrar nota
    await deleteNotaBiId(id);
    res.send({
      status: `ok`,
      message: `la nota con id: ${id} ha sido borrada`,
    });
  } catch (error) {
    next(error);
  }
};
//Petición consulta notas publicadas
const getNotesController = async (req, res, next) => {
  try {
    const notas = await getAllNotas();

    res.send({
      status: "ok",
      data: notas,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getNotesController,
  newNoteController,
  getSingleNoteController,
  deleteNoteController,
  ModifyNoteController,
};
