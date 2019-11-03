import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models/index';

chai.use(chaiHttp);
chai.should();

const { driver: Driver } = models;
let driver;

describe('Driver', () => {
    before(async () => {
        try {
            driver = await Driver.findOne({
                where: { email: 'pacifique.ndayisenga@andela.com' }
            });
        } catch (error) {
            console.log(error);
        }
    });
    it('should fetch all drivers', done => {
        chai.request(app)
            .get('/api/v1/drivers')
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Drivers successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('drivers');
                res.body.data.drivers.should.be.an('array');
                res.body.data.drivers.should.have.lengthOf(5);
                done();
            });
    });

    it('should fetch all available drivers', done => {
        chai.request(app)
            .get('/api/v1/drivers/available')
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Available Drivers successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('drivers');
                res.body.data.drivers.should.be.an('array');
                res.body.data.drivers[0].is_available.should.equal(true);
                done();
            });
    });

    it('should fetch one driver', done => {
        const { id } = driver.dataValues;
        chai.request(app)
            .get(`/api/v1/drivers/${id}`)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Driver successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('driver');
                res.body.data.driver.should.be.an('object');
                res.body.data.driver.email.should.equal(
                    'pacifique.ndayisenga@andela.com'
                );
                done();
            });
    });

    it('should not fetch a driver if does not exist', done => {
        chai.request(app)
            .get('/api/v1/drivers/6')
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have
                    .property('message')
                    .eql('Driver not found');
                done();
            });
    });

    it('should not fetch a driver if the ID is not an integer', done => {
        chai.request(app)
            .get('/api/v1/drivers/abc')
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(500);
                res.body.should.have.property('status').eql('error');
                res.body.should.have
                    .property('message')
                    .eql('invalid input syntax for integer: "abc"');
                done();
            });
    });

    it('should fetch drivers within 3 km', done => {
        const coordinates = {
            latitude: 1,
            longitude: 1
        };
        chai.request(app)
            .get('/api/v1/drivers/3km')
            .send(coordinates)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Drivers successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('drivers');
                res.body.data.drivers.should.be.an('array');
                res.body.data.drivers.should.have.lengthOf(1);
                done();
            });
    });

    it('should not fetch drivers within 3 km if latitude is not an integer', done => {
        const coordinates = {
            latitude: '1',
            longitude: 1
        };
        chai.request(app)
            .get('/api/v1/drivers/3km')
            .send(coordinates)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have
                    .property('message')
                    .eql('The latitude must be an integer');
                done();
            });
    });

    it('should not fetch drivers within 3 km if longitude is not an integer', done => {
        const coordinates = {
            latitude: 1,
            longitude: '1'
        };
        chai.request(app)
            .get('/api/v1/drivers/3km')
            .send(coordinates)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(400);
                res.body.should.have.property('status').eql('error');
                res.body.should.have
                    .property('message')
                    .eql('The longitude must be an integer');
                done();
            });
    });
});
