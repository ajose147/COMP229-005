import mongoose from 'mongoose';
import config from '../config/config.js';
import User from '../server/models/user.model.js';

const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

async function run() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to DB');
    const existing = await User.findOne({ email: adminEmail });
    if (existing) {
      console.log('Admin user already exists:', adminEmail);
      process.exit(0);
    }
    const admin = new User({ name: 'Admin', email: adminEmail });
    admin.password = adminPassword;
    admin.role = 'admin';
    await admin.save();
    console.log('Admin user created:', adminEmail, 'with password from env or default.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
