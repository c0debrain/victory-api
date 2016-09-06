module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('PlaidCategory', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        plaid_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        hierarchy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'PlaidCategories'
    }, {
        classMethods: {
            associate: function(models) {
                models.plaidToken.belongsTo(models.user);
            }
        }
    });
};