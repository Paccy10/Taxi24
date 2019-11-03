import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models/index';

chai.use(chaiHttp);
chai.should();

const { rider: Rider } = models;
let rider;

describe('Rider', () => {
    before(async () => {
        try {
            rider = await Rider.findOne({
                where: { email: 'frank.habimana@andela.com' }
            });
        } catch (error) {
            console.log(error);
        }
    });

    it('should fetch all riders', done => {
        chai.request(app)
            .get('/api/v1/riders')
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Riders successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('riders');
                res.body.data.riders.should.be.an('array');
                res.body.data.riders.should.have.lengthOf(5);
                done();
            });
    });

    it('should fetch one rider', done => {
        const { id } = rider.dataValues;
        chai.request(app)
            .get(`/api/v1/riders/${id}`)
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have
                    .property('message')
                    .eql('Rider successfully fetched');
                res.body.should.have.property('data');
                res.body.data.should.have.property('rider');
                res.body.data.rider.should.be.an('object');
                res.body.data.rider.email.should.equal(
                    'frank.habimana@andela.com'
                );
                done();
            });
    });

    it('should not fetch a rider if does not exist', done => {
        chai.request(app)
            .get('/api/v1/riders/6')
            .end((error, res) => {
                if (error) {
                    done(error);
                }
                res.should.status(404);
                res.body.should.have.property('status').eql('error');
                res.body.should.have.property('message').eql('Rider not found');
                done();
            });
    });

    it('should not fetch a rider if the ID is not an integer', done => {
        chai.request(app)
            .get('/api/v1/riders/abc')
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

    it('should fetch 3 closest drivers', done => {
        const coordinates = {
            latitude: 1,
            longitude: 1
        };
        chai.request(app)
            .get('/api/v1/riders/closest')
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
                res.body.data.drivers.should.have.lengthOf(3);
                done();
            });
    });

    it('should not fetch 3 closest drivers if latitude is not an integer', done => {
        const coordinates = {
            latitude: '1',
            longitude: 1
        };
        chai.request(app)
            .get('/api/v1/riders/closest')
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

    it('should not fetch 3 closest drivers if longitude is not an integer', done => {
        const coordinates = {
            latitude: 1,
            longitude: '1'
        };
        chai.request(app)
            .get('/api/v1/riders/closest')
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
