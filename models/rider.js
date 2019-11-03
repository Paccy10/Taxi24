const riderModel = (sequelize, DataTypes) => {
    const Rider = sequelize.define(
        'rider',
        {
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {}
    );
    return Rider;
};

export default riderModel;
