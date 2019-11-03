import express from 'express';
import DriverController from '../controllers/driver';
import asyncHandler from '../middlewares/errors/asyncHandler';
import validateCoordinates from '../middlewares/validators/driver';

const router = express.Router();
const driver = new DriverController();

router.get('/', asyncHandler(driver.getAllDrivers));
router.get('/available', asyncHandler(driver.getAvailableDrivers));
router.get(
    '/3km',
    validateCoordinates,
    asyncHandler(driver.getDriversWithinThreeKm)
);
router.get('/:driverID', asyncHandler(driver.getOneDriver));

export default router;
