const Joi = require("joi");

function validation(schema) {
  return (req, res, next) => {
    const { error: bodyError } = schema?.body
      ? schema.body.validate(req.body)
      : { error: null };

    const { error: paramsError } = schema?.params
      ? schema.params.validate(req.params)
      : { error: null };

    const { error: queryErrors } = schema?.query
      ? schema.query.validate(req.query)
      : { error: null };

    if (bodyError) {
      return res.status(400).json({ error: bodyError.details[0].message });
    }

    if (paramsError) {
      return res.status(400).json({ error: paramsError.details[0].message });
    }

    if (queryErrors) {
      return res.status(400).json({ error: queryErrors.details[0].message });
    }

    next();
  };
}

module.exports = validation;
