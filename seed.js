require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('./models');

async function seed() {
  await sequelize.authenticate();
  await sequelize.sync();

  const users = [
    { name: 'Dr. Smith', email: 'teacher@genzed.com', password: 'password123', role: 'teacher', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dr.Smith' },
    { name: 'Alice Johnson', email: 'student@genzed.com', password: 'password123', role: 'student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
    { name: 'Admin User', email: 'admin@genzed.com', password: 'password123', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' }
  ];

  for (const u of users) {
    const existing = await User.findOne({ where: { email: u.email } });
    if (!existing) {
      const hashed = await bcrypt.hash(u.password, 8);
      await User.create({ name: u.name, email: u.email, password: hashed, role: u.role, avatar: u.avatar });
      console.log('Created', u.email);
    } else {
      console.log('Already exists', u.email);
    }
  }

  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
