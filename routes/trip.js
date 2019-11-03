import express from 'express';
import TripController from '../controllers/trip';
import asyncHandler from '../middlewares/errors/asyncHandler';
import validateTrip from '../middlewares/validators/trip';
import checkRiderAvailability from '../middlewares/checkRiderAvailability';
import checkDriverAvailability from '../middlewares/checkDriverAvailability';

const router = express.Router();
const trip = new TripController();

router.post(
    '/',
    validateTrip,
    checkRiderAvailability,
    checkDriverAvailability,
    asyncHandler(trip.createTrip)
);
router.patch('/:tripID/complete', asyncHandler(trip.completeTrip));
router.get('/active', asyncHandler(trip.getActiveTrips));

export default router;
