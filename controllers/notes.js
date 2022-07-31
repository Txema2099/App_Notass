const NewNoteController= asyns (req, res , next) => {
    try {
        res.send({
            status: 'error',
            message: 'Not implementado'
        });
    }catch(error){
        next(error);
        
    }
};
const getSingleNoteController = asyns (req, res , next) => {};
const deleteNoteController = asyns (req, res , next) => {};
const getNotesController = asyns (req, res , next) => {};

module.exports = {
    NewNoteController,
    getNotesController,
    getSingleNoteController,
    deleteNoteController,
};
