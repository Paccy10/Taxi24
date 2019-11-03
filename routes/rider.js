import express from 'express';
import RiderController from '../controllers/rider';
import asyncHandler from '../middlewares/errors/asyncHandler';

const router = express.Router();
const rider = new RiderController();

router.get('/', asyncHandler(rider.getAllRiders));
router.get('/:riderID', asyncHandler(rider.getOneRider));

export default router;
