const driverModel = (sequelize, DataTypes) => {
    const Driver = sequelize.define(
        'driver',
        {
            firstname: { type: DataTypes.STRING },
            lastname: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
            is_available: { type: DataTypes.BOOLEAN, defaultValue: false },
            latitude: { type: DataTypes.INTEGER },
            longitude: { type: DataTypes.INTEGER }
        },
        {}
    );
    return Driver;
};

export default driverModel;
