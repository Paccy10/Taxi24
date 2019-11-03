import models from '../models/index';

const { trip: Trip, rider: Rider } = models;

const checkRiderAvailability = async (req, res, next) => {
    const rider = await Rider.findByPk(req.body.rider);
    const tripRider = await Trip.findOne({
        where: { rider: req.body.rider, is_complete: false }
    });
    if (!rider) {
        return res.status(404).json({
            status: 'error',
            message: 'Rider not found'
        });
    }
    if (tripRider) {
        return res.status(400).json({
            status: 'error',
            message: 'The rider has an unfinished trip'
        });
    }
    next();
};

export default checkRiderAvailability;
