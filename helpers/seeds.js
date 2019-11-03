import bcrypt from 'bcrypt';

const drivers = [
    {
        firstname: 'Pacifique',
        lastname: 'Ndayisenga',
        email: 'pacifique.ndayisenga@andela.com',
        is_available: true,
        latitude: 1,
        longitude: 6,
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        firstname: 'Fabrice',
        lastname: 'Manzi',
        email: 'fabrice.manzi@andela.com',
        is_available: true,
        latitude: 1,
        longitude: 5,
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        firstname: 'Charles',
        lastname: 'Muta',
        email: 'charles.muta@andela.com',
        is_available: true,
        latitude: 1,
        longitude: 4,
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        firstname: 'Christian',
        lastname: 'Ituze',
        email: 'christian.ituze@andela.com',
        is_available: true,
        latitude: 1,
        longitude: 3,
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        firstname: 'Innocent',
        lastname: 'Nkunzi',
        email: 'innocent.nkunzi@andela.com',
        is_available: true,
        latitude: 1,
        longitude: 2,
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const riders = [
    {
        firstname: 'Frank',
        lastname: 'Habimana',
        email: 'frank.habimana@andela.com',
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        firstname: 'Clet',
        lastname: 'Mwunguzi',
        email: 'clet.mwunguzi@andela.com',
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        firstname: 'Jacques',
        lastname: 'Munezero',
        email: 'jacques.munezero@andela.com',
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        firstname: 'Blaise',
        lastname: 'Bakundukize',
        email: 'blaise.bakundukize@andela.com',
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        firstname: 'Emile',
        lastname: 'Nsengimana',
        email: 'emile.nsengimana@andela.com',
        password: bcrypt.hashSync('password', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

export default {
    drivers,
    riders
};
