module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    courseId: { type: DataTypes.INTEGER.UNSIGNED },
    userId: { type: DataTypes.INTEGER.UNSIGNED },
    rating: { type: DataTypes.INTEGER },
    comment: { type: DataTypes.TEXT },
  });
  return Review;
};
