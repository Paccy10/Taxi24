const tripModel = (sequelize, DataTypes) => {
    const Trip = sequelize.define(
        'trip',
        {
            rider: {
                type: DataTypes.INTEGER,
                references: { model: 'rider', key: 'id' }
            },
            driver: {
                type: DataTypes.INTEGER,
                references: { model: 'driver', key: 'id' }
            },
            is_complete: { type: DataTypes.BOOLEAN, defaultValue: false },
            origin: { type: DataTypes.STRING },
            destination: { type: DataTypes.STRING },
            cost: { type: DataTypes.FLOAT }
        },
        {}
    );
    Trip.associate = models => {
        Trip.belongsTo(models.driver, {
            as: 'driverFKey',
            foreignKey: 'driver',
            onDelete: 'CASCADE'
        });
        Trip.belongsTo(models.rider, {
            as: 'riderFKey',
            foreignKey: 'rider',
            onDelete: 'CASCADE'
        });
    };
    return Trip;
};

export default tripModel;
