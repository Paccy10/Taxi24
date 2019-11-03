const raiseError = (message, res) => {
    res.status(400).json({
        status: 'error',
        message
    });
};

const validateCoordinates = (req, res, next) => {
    const { latitude, longitude } = req.body;
    if (!Number.isInteger(latitude)) {
        return raiseError('The latitude must be an integer', res);
    }

    if (!Number.isInteger(longitude)) {
        return raiseError('The longitude must be an integer', res);
    }

    next();
};

export default validateCoordinates;
