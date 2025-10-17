const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME || 'genzed_db', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  logging: false,
});

const User = require('./user')(sequelize, DataTypes);
const Course = require('./course')(sequelize, DataTypes);
const Batch = require('./batch')(sequelize, DataTypes);
const Notification = require('./notification')(sequelize, DataTypes);
const Review = require('./review')(sequelize, DataTypes);
const Enrollment = require('./enrollment')(sequelize, DataTypes);

// Associations (basic)
User.hasMany(Notification, { foreignKey: 'userId' });
Notification.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Enrollment, { foreignKey: 'userId' });
Enrollment.belongsTo(User, { foreignKey: 'userId' });

Course.hasMany(Batch, { foreignKey: 'courseId' });
Batch.belongsTo(Course, { foreignKey: 'courseId' });

Course.hasMany(Review, { foreignKey: 'courseId' });
Review.belongsTo(Course, { foreignKey: 'courseId' });

Enrollment.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = { sequelize, Sequelize, User, Course, Batch, Notification, Review, Enrollment };
