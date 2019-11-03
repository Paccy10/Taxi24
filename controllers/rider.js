/* eslint-disable no-plusplus */
import models from '../models/index';

const { rider: Rider, driver: Driver } = models;

class RiderController {
    async getAllRiders(req, res) {
        const riders = await Rider.findAll({
            attributes: { exclude: ['password'] }
        });
        res.status(200).json({
            status: 'success',
            message: 'Riders successfully fetched',
            data: {
                riders
            }
        });
    }

    async getOneRider(req, res) {
        const id = req.params.riderID;
        const rider = await Rider.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!rider) {
            return res.status(404).json({
                status: 'error',
                message: 'Rider not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Rider successfully fetched',
            data: {
                rider
            }
        });
    }

    async getClosestDrivers(req, res) {
        const drivers = await Driver.findAll({
            raw: true,
            attributes: { exclude: ['password'] }
        });
        const { latitude, longitude } = req.body;
        const availableDrivers = [];
        const distances = [];
        for (let i = 0; i < drivers.length; i++) {
            const distance = Math.sqrt(
                (latitude - drivers[i].latitude) *
                    (latitude - drivers[i].latitude) +
                    (longitude - drivers[i].longitude) *
                        (longitude - drivers[i].longitude)
            );
            if (distances.length === 0) {
                distances.push(distance);
                availableDrivers.push(drivers[i]);
            } else {
                // eslint-disable-next-line no-lonely-if
                distances.push(distance);
                availableDrivers.push(drivers[i]);
                for (let j = i; j >= 0; j--) {
                    if (distances[j] < distances[j - 1]) {
                        const tempDistance = distances[j - 1];
                        const tempDriver = availableDrivers[j - 1];
                        distances[j - 1] = distances[j];
                        availableDrivers[j - 1] = availableDrivers[j];
                        distances[j] = tempDistance;
                        availableDrivers[j] = tempDriver;
                    }
                }
            }
        }

        res.status(200).json({
            status: 'success',
            message: 'Drivers successfully fetched',
            data: {
                drivers: availableDrivers.slice(0, 3)
            }
        });
    }
}

export default RiderController;
