import models from '../models/index';

const { rider: Rider } = models;

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
}

export default RiderController;
