import express from 'express';
import driverRoutes from './routes/driver';
import riderRoutes from './routes/rider';
import tripRoutes from './routes/trip';

const app = new express();

const port = 5000;

app.use(express.json());

app.use('/api/v1/drivers', driverRoutes);
app.use('/api/v1/riders', riderRoutes);
app.use('/api/v1/trips', tripRoutes);

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Undefined route'
    });
});

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`);
});

export default app;
