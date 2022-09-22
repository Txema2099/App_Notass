//*importo fx de ../db/notas
const path = require(`path`);
const sharp = require(`sharp`);
const uuid = require(`uuid`);
//*importaciones de Gnotes
const {
  //!colocar esquemas joi a todas las funciones de rutas
  createNote,
  getAllNotas,
  getNotaByid,
  deleteNotaBiId,
  ModifyNote,
} = require('../db/Gnotes');
const { generateError, createPathIfNotExists } = require('../helpfun');

//*peticion gestion de nueva nota
const NewNoteController = async (req, res, next) => {
  try {
    const { text, Titulo, categoria } = req.body;
    if (!text || text.length > 300 || !Titulo || !categoria) {
      throw generateError(
        'Debe escribir texto, Titulo y categoria en la nota y el texto ser menor de 300 caracteres',
        400
      );
    }
    //*Procesado imagen
    let imageFilename;
    if (req.files && req.files.image) {
      //*Creo el path del directorio uploads
      const uploadsDir = path.join(__dirname, `../uploads`);
      console.log(uploadsDir);
      //*Creo el directorio si no existe
      await createPathIfNotExists(uploadsDir);
      //*Proceso imagen.
      const image = sharp(req.files.image.data);
      const meta = await image.metadata();
      image.resize(1000);
      //*Guardo la imagen con nombre aleatorio en el directorio uploads
      imageFilename = `upload_${uuid.v4()}.${meta.format}`;
      await image.toFile(path.join(uploadsDir, imageFilename));
      //devuelvo nombre del archivo
      //return imageFilename;
    }
    const id = await createNote(
      req.userId,
      text,
      imageFilename,
      Titulo,
      categoria
    );

    res.send({
      status: 'ok',
      message: 'Nueva nota creada correctamente',
    });
  } catch (error) {
    next(error);
  }
};
//*crear una gestion de funcion async para gestion de modifinote
const ModifyNoteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text, image, Titulo, categoria, Public } = req.body;
    if (!text || text.length > 300 || !Titulo || !categoria) {
      throw generateError(
        'Debe escribir texto, Titulo y categoria en la nota y el texto ser menor de 300 caracteres',
        400
      );
    }

    const idpet = await ModifyNote(
      id,
      req.userId,
      text,
      image,
      Titulo,
      categoria,
      Public
    );

    res.send({
      status: 'ok',
      message: 'Su nota a sido modificada correctamente',
    });
  } catch (error) {
    next(error);
  }
};

//*peticon gestion de nota id
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

//*peticon gestion de eliminar nota
const deleteNoteController = async (req, res, next) => {
  try {
    const { id } = req.params;

    //*sacar info de la nota que quiero borrar
    const nota = await getNotaByid(id);

    //*comprobar que le usuario del token creó la nota
    if (req.userId !== nota.user_id) {
      throw generateError(
        `Estás tratando de borrar una nota no escrito por Usted`,
        401
      );
    }
    //*Borrar nota
    await deleteNotaBiId(id);
    res.send({
      status: `ok`,
      message: `la nota ha sido borrada correctamente`,
    });
  } catch (error) {
    next(error);
  }
};
//*peticion consulta de notas
const getNotesController = async (req, res, next) => {
  try {
    const notas = await getAllNotas();

    res.send({
      status: 'ok',
      data: notas,
    });
  } catch (error) {
    next(error);
  }
};

//*exportaciones
module.exports = {
  NewNoteController,
  getNotesController,
  getSingleNoteController,
  deleteNoteController,
  ModifyNoteController,
};
