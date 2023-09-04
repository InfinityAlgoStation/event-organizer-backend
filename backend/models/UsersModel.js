const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: [true, 'Username is required'],
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email format',
    },
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  profileImage: {
    type: String,
    required: false,
  },
  role: { 
    type: String, 
    enum: ['admin', 'partyCenterManager', 'customer'], 
    required: [true, 'Role is required'],
  },
  resetToken: {
    type: String,
    required: false,
  },
  resetTokenExpires: {
    type: Date,
    required: false,
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
