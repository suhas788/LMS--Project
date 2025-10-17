module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED },
    courseId: { type: DataTypes.INTEGER.UNSIGNED },
    batchId: { type: DataTypes.INTEGER.UNSIGNED },
  });
  return Enrollment;
};
