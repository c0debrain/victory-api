var crypto = require('crypto');

module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('AuthToken', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDv4,
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
        auth_token: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: function() {
                return crypto.randomBytes(32).toString('hex');
            }
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true
    }, {
        classMethods: {
            associate: function(models) {
                models.AuthToken.belongsTo(models.User);
            }
        }
    });
};
