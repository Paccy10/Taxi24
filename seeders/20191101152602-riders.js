import seeds from '../helpers/seeds';

const riderSeed = {
    up: queryInterface => {
        return queryInterface.bulkInsert('riders', seeds.riders);
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('riders', seeds.riders);
    }
};

export default riderSeed;
