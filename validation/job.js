const validate = require("validate.js");

const validateSessionInput = (req, res, next) => {
  // Define custom parse and format functions for datetime validator
  validate.extend(validate.validators.datetime, {
    // Parse input to a JavaScript Date object
    parse: function (value) {
      return new Date(value).getTime(); // Convert to timestamp
    },
    // Format JavaScript Date object into ISO 8601 string
    format: function (value) {
      return new Date(value).toISOString(); // Convert to ISO 8601
    }
  });

  // Validation constraints
  const constraints = {
    ownerID: {
      presence: true,
      format: {
        pattern: /^[0-9a-fA-F]{24}$/,
        message: "must be a valid MongoDB ObjectID"
      }
    },
    title: {
      presence: true,
      type: "string",
      length: { minimum: 1, maximum: 100 }
    },
    address: {
      presence: true,
      type: "string",
      length: { minimum: 10, maximum: 200 }
    },
    date: {
      presence: true,
      datetime: true // Validate as a datetime field
    },
    price: {
      presence: true,
      numericality: {
        greaterThan: 0,
        message: "must be a positive number"
      }
    }
  };

  // Validate request body
  const validationErrors = validate(req.body, constraints);

  if (validationErrors) {
    // Return validation errors
    return res.status(400).json({
      message: "Validation failed",
      errors: validationErrors
    });
  }

  // Proceed if validation passes
  next();
};

module.exports = validateSessionInput;