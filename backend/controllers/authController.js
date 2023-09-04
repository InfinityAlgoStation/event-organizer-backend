const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UsersModel');
const {jwtTokenGenarate,jwtRefreshToken,resetJwtToken,smtpUsername,smtpPassword,ClientURL} = require('../config/secret');
const {transporter} = require('../middleware/transporter');
// const { generateAccessToken, generateRefreshToken } = require('../middleware/jwt_token');
const multer = require('multer');
const {profileImageUpload} = require('../middleware/images');


const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, jwtTokenGenarate, { expiresIn: '1h' });
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ userId: user._id, role: user.role }, jwtRefreshToken);
  user.refreshToken = refreshToken;
  user.save();
  return refreshToken;
};

const register = async (req, res) => {
  try {
   

    profileImageUpload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: 'Error uploading profile image' });
        } else if (err) {
          return res.status(500).json({ message: 'Internal server error' });
        }
     }
    );

   
    const { username, email, password, address, role } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    
    const profileImage = req.file ? req.file.path : null;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword,address, profileImage, role });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    res.status(201).json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User is not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'password did not matched' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, { httpOnly: true });

    res.status(200).json({ accessToken });
    
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};



const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = generateAccessToken(user);
    const resetTokenExpires = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;

    await user.save();

    const resetPasswordLink = `${ClientURL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: 'freelancerudoy752@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetPasswordLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: `Password reset link has been sent to ${user.email}` });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    const username = user?.username;

    if (!user.resetToken) {
      return res.status(400).json({ message: 'Reset token is missing for the user' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return res.status(500).json({ message: 'Error occurred while hashing the new password' });
    }

    user.password = hashedPassword;

    if (user.resetToken !== null && user.resetTokenExpires !== null) {
      // Clear the resetToken field and resetTokenExpires field
      user.resetToken = null;
      user.resetTokenExpires = null;
      await user.save();
    } else {
      return res.status(402).json({ message: 'You have already changed the password through this link. Please try a new link.' });
    }

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect current password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};






module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,

}