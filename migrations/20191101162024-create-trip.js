const tripMigration = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('trips', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            rider: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'riders',
                    key: 'id'
                }
            },
            driver: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: 'CASCADE',
                references: {
                    model: 'drivers',
                    key: 'id'
                }
            },
            is_complete: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            origin: {
                type: Sequelize.STRING,
                allowNull: false
            },
            destination: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cost: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: queryInterface => {
        return queryInterface.dropTable('trips');
    }
};

export default tripMigration;
