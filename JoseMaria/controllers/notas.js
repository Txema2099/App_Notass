const {
  createNota,
  getAllNotas,
  getNotaByid,
  deleteNotaBiId,
} = require('../db/notas');
const { generateError } = require('../helpers');
//const path = require(`path`);

const getNoteController = async (req, res, next) => {
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

const newNoteController = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || text.length > 1000) {
      throw generateError(
        'El texto de la nota debe existir y ser menor de 1000 caracteres',
        400
      );
    }

    const id = await createNota(req.userId, text);

    res.send({
      status: 'ok',
      message: `Tweet con id: ${id} creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

const getSimpleNoteController = async (req, res, next) => {
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
        `Estás tratando de borrar una nota no escrito pot tí`,
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

module.exports = {
  getNoteController,
  newNoteController,
  getSimpleNoteController,
  deleteNoteController,
};
