module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "users", {
        email: {
            type:DataTypes.STRING(30),
            allowNull:false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );