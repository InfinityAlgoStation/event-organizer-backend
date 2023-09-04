const nodemailer = require('nodemailer');
const {smtpUsername,smtpPassword} = require('../config/secret');

const transporter = nodemailer.createTransport({
    // Configure the transporter for sending emails
    service: 'gmail',
    auth: {
      user: smtpUsername,
      pass: smtpPassword
    }
});




module.exports = {
    transporter,
}