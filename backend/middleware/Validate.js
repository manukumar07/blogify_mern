const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        // Send all validation errors
        const errors = error.details.map((err) => ({
            field: err.path.join("."),
            message: err.message,
        }));

        return res.status(400).json({
            message: "Validation failed",
            errors,
        });
    }

    next();
};

module.exports = validate;