const raiseError = (message, res) => {
    res.status(400).json({
        status: 'error',
        message
    });
};

const validateTrip = (req, res, next) => {
    const { rider, driver, origin, destination, cost } = req.body;
    if (!Number.isInteger(rider)) {
        return raiseError('The rider ID must be an integer', res);
    }

    if (!Number.isInteger(driver)) {
        return raiseError('The driver ID must be an integer', res);
    }

    if (origin.trim().length === 0) {
        return raiseError('The trip origin is required', res);
    }

    if (destination.trim().length === 0) {
        return raiseError('The trip destination is required', res);
    }

    if (typeof cost !== 'number' || cost < 0) {
        return raiseError('The cost must be a positive number', res);
    }

    next();
};

export default validateTrip;
