module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define('Batch', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    courseId: { type: DataTypes.INTEGER.UNSIGNED },
    startDate: { type: DataTypes.DATE },
    endDate: { type: DataTypes.DATE },
  });
  return Batch;
};
