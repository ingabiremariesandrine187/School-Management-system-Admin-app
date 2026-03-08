const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const User = require('../src/models/User');

async function run() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/school_db';
  await mongoose.connect(uri);
  const email = process.argv[2] || 'admin@school.com'; // accept CLI arg or default to admin@school.com
  const newPassword = process.argv[3] || 'Admin123!';  // accept CLI arg or default

  const user = await User.findOne({ email });
  if (!user) {
    console.log('Admin not found for email:', email);
    await mongoose.disconnect();
    return;
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  console.log('Password updated for', email, '->', newPassword);
  await mongoose.disconnect();
}

run().catch(err => { console.error(err); process.exit(1); });