import models from '../models/index';

const { trip: Trip, driver: Driver } = models;

class TripController {
    async createTrip(req, res) {
        const newTrip = {
            rider: req.body.rider,
            driver: req.body.driver,
            origin: req.body.origin.trim(),
            destination: req.body.destination.trim(),
            cost: req.body.cost
        };
        const { dataValues: trip } = await Trip.create(newTrip);
        await Driver.update(
            {
                is_available: false
            },
            {
                where: { id: req.body.driver }
            }
        );

        return res.status(201).json({
            status: 'success',
            message: 'Trip successfully created',
            data: {
                trip
            }
        });
    }

    async completeTrip(req, res) {
        const { tripID } = req.params;
        const trip = await Trip.findOne({
            where: { id: tripID, is_complete: false }
        });

        if (!trip) {
            return res.status(404).json({
                status: 'error',
                message: 'Trip not found'
            });
        }

        const completedTrip = await Trip.update(
            {
                is_complete: true
            },
            {
                where: { id: tripID },
                returning: true,
                plain: true
            }
        );
        await Driver.update(
            {
                is_available: true
            },
            {
                where: { id: completedTrip[1].driver }
            }
        );

        return res.status(200).json({
            status: 'success',
            message: 'Trip successfully completed',
            data: {
                trip: completedTrip[1]
            }
        });
    }

    async getActiveTrips(req, res) {
        const trips = await Trip.findAll({
            where: { is_complete: false }
        });

        res.status(200).json({
            status: 'success',
            message: 'Active Trips successfully fetched',
            data: {
                trips
            }
        });
    }
}

export default TripController;
