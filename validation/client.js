const validate = require("validate.js");

const validateClientInput = (req, res, next) => {
  // Define validation constraints
  const constraints = {
    firstname: {
      presence: true,
      type: "string",
      length: { minimum: 1 },
    },
    lastname: {
      presence: true,
      type: "string",
      length: { minimum: 1 },
    },
    email: {
      presence: true,
      email: true,
    },
    phone: {
      presence: true,
      type: "string",
      length: { is: 10 }, // Ensure 10-digit phone numbers
      numericality: { onlyInteger: true },
    },
    address: {
      presence: true,
      type: "string",
      length: { minimum: 5 },
    },
  };

  // Validate request body
  const validationErrors = validate(req.body, constraints);

  if (validationErrors) {
    // Respond with validation errors
    return res.status(400).json({
      message: "Validation failed",
      errors: validationErrors,
    });
  }

  // If validation passes, proceed to the next middleware/controller
  next();
};

module.exports = validateClientInput;
