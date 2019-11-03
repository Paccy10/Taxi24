import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Application', () => {
    before(async () => {
        try {
            // driverData = await Driver.findByPk(1);
            // riderData = await Rider.findByPk(1);
        } catch (error) {
            console.log(error);
        }
    });

    it('should create a trip', done => {
        const trip = {
            rider: 1,
            driver: 1,
            origin: 'Kimironko',
            destination: 'Downtown',
            cost: 1200
        };
        chai.request(app)
            .post('/api/v1/trips')
            .send(trip)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(201);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Trip successfully created');
                res.body.should.have.property('data');
                res.body.data.should.have.property('trip');
                res.body.data.trip.should.have
                    .property('rider')
                    .eql(trip.rider);
                res.body.data.trip.should.have
                    .property('driver')
                    .eql(trip.driver);
                done();
            });
    });

    it('should not create a trip if the rider ID is not an integer', done => {
        const trip = {
            rider: 'id',
            driver: 1,
            origin: 'Kimironko',
            destination: 'Downtown',
            cost: 1200
        };
        chai.request(app)
            .post('/api/v1/trips')
            .send(trip)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have
                    .property('message')
                    .eql('The rider ID must be an integer');
                done();
            });
    });

    it('should not create a trip if the driver ID is not an integer', done => {
        const trip = {
            rider: 1,
            driver: 'id',
            origin: 'Kimironko',
            destination: 'Downtown',
            cost: 1200
        };
        chai.request(app)
            .post('/api/v1/trips')
            .send(trip)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have
                    .property('message')
                    .eql('The driver ID must be an integer');
                done();
            });
    });

    it('should not create a trip if the trip origin is not provided', done => {
        const trip = {
            rider: 1,
            driver: 1,
            origin: '',
            destination: 'Downtown',
            cost: 1200
        };
        chai.request(app)
            .post('/api/v1/trips')
            .send(trip)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have
                    .property('message')
                    .eql('The trip origin is required');
                done();
            });
    });

    it('should not create a trip if the trip destination is not provided', done => {
        const trip = {
            rider: 1,
            driver: 1,
            origin: 'Kimironko',
            destination: '',
            cost: 1200
        };
        chai.request(app)
            .post('/api/v1/trips')
            .send(trip)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have
                    .property('message')
                    .eql('The trip destination is required');
                done();
            });
    });

    it('should not create a trip if the trip cost is not a positive number', done => {
        const trip = {
            rider: 1,
            driver: 1,
            origin: 'Kimironko',
            destination: 'Downtown',
            cost: -1200
        };
        chai.request(app)
            .post('/api/v1/trips')
            .send(trip)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have
                    .property('message')
                    .eql('The cost must be a positive number');
                done();
            });
    });

    it('should not create a trip with a non existing rider', done => {
        const trip = {
            rider: 6,
            driver: 1,
            origin: 'Kimironko',
            destination: 'Downtown',
            cost: 1200
        };
        chai.request(app)
            .post('/api/v1/trips')
            .send(trip)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('message').eql('Rider not found');
                done();
            });
    });

    it('should not create a trip with a rider that has an unfinished trip', done => {
        const trip = {
            rider: 1,
            driver: 1,
            origin: 'Kimironko',
            destination: 'Downtown',
            cost: 1200
        };
        chai.request(app)
            .post('/api/v1/trips')
            .send(trip)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have
                    .property('message')
                    .eql('The rider has an unfinished trip');
                done();
            });
    });

    it('should not create a trip with a non existing driver', done => {
        const rider = 2;
        const driver = 6;
        const trip = {
            rider,
            driver,
            origin: 'Kimironko',
            destination: 'Downtown',
            cost: 1200
        };
        chai.request(app)
            .post('/api/v1/trips')
            .send(trip)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have
                    .property('message')
                    .eql('Driver not found');
                done();
            });
    });

    it('should not create a trip if the driver is not available', done => {
        const rider = 2;
        const driver = 1;
        const trip = {
            rider,
            driver,
            origin: 'Kimironko',
            destination: 'Downtown',
            cost: 1200
        };
        chai.request(app)
            .post('/api/v1/trips')
            .send(trip)
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have
                    .property('message')
                    .eql('The driver is not available');
                done();
            });
    });

    it('should complete a trip', done => {
        chai.request(app)
            .patch('/api/v1/trips/1/complete')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Trip successfully completed');
                res.body.should.have.property('data');
                res.body.data.should.have.property('trip');
                res.body.data.trip.should.have.property('rider').eql(1);
                res.body.data.trip.should.have.property('driver').eql(1);
                done();
            });
    });

    it('should not complete a trip if the trip does not exist or has lready been completed', done => {
        chai.request(app)
            .patch('/api/v1/trips/1/complete')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('message').eql('Trip not found');
                done();
            });
    });

    it('should fetch all active trips', done => {
        chai.request(app)
            .get('/api/v1/trips/active')
            .end((err, res) => {
                if (err) {
                    done(err);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Active Trips successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('trips');
                res.body.data.trips.should.be.an('array');
                res.body.data.trips.should.have.lengthOf(0);
                done();
            });
    });
});
