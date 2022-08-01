//importaciones
const { generateError } = require('./helpers');

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
//exportaciones
module.exports = {
  NewNoteController,
  getNotesController,
  getSingleNoteController,
  deleteNoteController,
};
