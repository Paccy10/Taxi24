import models from '../models/index';

const { trip: Trip, driver: Driver } = models;

const checkRiderAvailability = async (req, res, next) => {
    const driver = await Driver.findByPk(req.body.driver);
    const tripDriver = await Trip.findOne({
        where: { rider: req.body.driver, is_complete: false }
    });
    if (!driver) {
        return res.status(404).json({
            status: 'error',
            message: 'Driver not found'
        });
    }
    if (tripDriver) {
        return res.status(400).json({
            status: 'error',
            message: 'The driver is not available'
        });
    }
    next();
};

export default checkRiderAvailability;
