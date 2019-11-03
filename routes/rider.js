import express from 'express';
import RiderController from '../controllers/rider';
import asyncHandler from '../middlewares/errors/asyncHandler';
import validateCoordinates from '../middlewares/validators/driver';

const router = express.Router();
const rider = new RiderController();

router.get('/', asyncHandler(rider.getAllRiders));
router.get(
    '/closest',
    validateCoordinates,
    asyncHandler(rider.getClosestDrivers)
);
router.get('/:riderID', asyncHandler(rider.getOneRider));

export default router;
