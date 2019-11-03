import seeds from '../helpers/seeds';

const driverSeed = {
    up: queryInterface => {
        return queryInterface.bulkInsert('drivers', seeds.drivers);
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('drivers', seeds.drivers);
    }
};

export default driverSeed;
