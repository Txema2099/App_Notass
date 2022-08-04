//*importaciones
const { createNote } = require('../db/Gnotes');
const { generateError } = require('../helpfun');

//*peticion gestion de nueva nota
const NewNoteController = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || text.length > 300) {
      throw generateError(
        'Debe escribir texto en la nota y ser menos de 300 caracteres',
        400
      );
    }

    const id = await createNote(req.userId, text);

    res.send({
      status: 'ok',
      message: 'Nueva nota creada correptamente',
    });
  } catch (error) {
    next(error);
  }
};
//!crear una gestion de funcion async para gestion de modifinote
//*peticon gestion de nota id
const getSingleNoteController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implementado',
    });
  } catch (error) {
    next(error);
  }
};

//*peticon gestion de eliminar nota
const deleteNoteController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implementado',
    });
  } catch (error) {
    next(error);
  }
};
//*peticion consulta de notas
const getNotesController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implementado',
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
};
