/* eslint-disable no-plusplus */
import models from '../models/index';

const { driver: Driver } = models;

class DriverController {
    async getAllDrivers(req, res) {
        const drivers = await Driver.findAll({
            attributes: { exclude: ['password'] }
        });
        res.status(200).json({
            status: 'success',
            message: 'Drivers successfully fetched',
            data: {
                drivers
            }
        });
    }

    async getAvailableDrivers(req, res) {
        const drivers = await Driver.findAll({
            where: { is_available: true },
            attributes: { exclude: ['password'] }
        });
        res.status(200).json({
            status: 'success',
            message: 'Available Drivers successfully fetched',
            data: {
                drivers
            }
        });
    }

    async getOneDriver(req, res) {
        const id = req.params.driverID;
        const driver = await Driver.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!driver) {
            return res.status(404).json({
                status: 'error',
                message: 'Driver not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Driver successfully fetched',
            data: {
                driver
            }
        });
    }

    async getDriversWithinThreeKm(req, res) {
        const drivers = await Driver.findAll({
            raw: true,
            attributes: { exclude: ['password'] }
        });
        const { latitude, longitude } = req.body;
        const availableDrivers = [];
        for (let i = 0; i < drivers.length; i++) {
            const distance = Math.sqrt(
                (latitude - drivers[i].latitude) *
                    (latitude - drivers[i].latitude) +
                    (longitude - drivers[i].longitude) *
                        (longitude - drivers[i].longitude)
            );
            if (distance === 3) {
                availableDrivers.push(drivers[i]);
            }
        }

        res.status(200).json({
            status: 'success',
            message: 'Drivers successfully fetched',
            data: {
                drivers: availableDrivers
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

export default DriverController;
