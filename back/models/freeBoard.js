module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "freeBoard", {
        title: {
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );