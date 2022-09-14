//importo fx de ../db/Gnotes.js
const path = require(`path`);
const sharp = require(`sharp`);
const uuid = require(`uuid`);
const {
  createNote,
  getAllNotas,
  getNotaByid,
  deleteNotaBiId,
  ModifyNote,
} = require("../db/Gnotes");
const { generateError, createPathIfNotExists } = require("../helpfun");
//createPathIfNotExists;

const newNoteController = async (req, res, next) => {
  try {
    //    console.log(req.body);
    //    console.log(req.files);
    const { text, categoria, titulo } = req.body;

    if (!text || text.length > 300) {
      throw generateError(
        "El texto de la nota debe existir y ser menor de 300 caracteres",
        400
      );
    }

    //Procesado imagen
    let imageFilename;
    if (req.files && req.files.image) {
      //Procesar imágen

      //Creo el path del directorio uploads
      const uploadsDir = path.join(__dirname, `../uploads`);
      console.log(uploadsDir);
      //Creo el directorio si no existe
      await createPathIfNotExists(uploadsDir);
      //Proceso imagen.
      //console.log(req.files.image);
      const image = sharp(req.files.image.data);
      const meta = await image.metadata();
      image.resize(1000);
      //Guardo la imagen con nombre aleatorio en el directorio uploads
      imageFilename = `upload_${uuid.v4()}.${meta.format}`;
      await image.toFile(path.join(uploadsDir, imageFilename));
      //devuelvo nombre del archivo
      //return imageFilename;
    }
    const id = await createNote(
      req.userId,
      text,
      imageFilename,
      categoria,
      titulo
    );

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
    const { id } = req.params;
    const { text, image, categoria, titulo, Public } = req.body;
    if (!text || text.length > 300 || !categoria || !titulo) {
      throw generateError(
        "Debe escribir texto en la nota y ser menos de 300 caracteres",
        400
      );
    }

    const idassist = await ModifyNote(
      id,
      req.userId,
      text,
      image,
      categoria,
      titulo,
      Public
    );

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

    //   if (req.userId !== nota.userId) { comentada para probar la linea de debajo codigo berto
    if (req.userId !== nota.user_id) {
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
    const notas = await getAllNotas(); //puedo pasar como paramerto id o email

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
