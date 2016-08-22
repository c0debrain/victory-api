module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('PlaidToken', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true
    }, {
        classMethods: {
            associate: function(models) {
                models.PlaidToken.belongsTo(models.User);
            }
        }
    });
};
