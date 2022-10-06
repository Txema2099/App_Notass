const Joi = require('joi');
//*esquema de validacion de datos de registro y login
const eventSchemaregistrer = Joi.object().keys({
  email: Joi.string().email().required().max(100),
  password: Joi.string().required().min(3).max(100).alphanum(),
});
const eventSchemaNotes = Joi.object().keys({
  email: Joi.string().email().required().max(100),
  password: Joi.string().required().min(3).max(100).alphanum(),
});

module.exports = {
  eventSchemaregistrer,
  eventSchemaNotes,
};

//! crear esquemas de cara una de los endpoint con diferecios a su utilizacion
