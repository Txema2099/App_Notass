//*importaciones
const { generateError } = require('../helpfun');

//*peticion gestion de nueva nota
const NewNoteController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implementado',
    });
  } catch (error) {
    next(error);
  }
};

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
