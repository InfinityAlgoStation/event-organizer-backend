const express = require('express');
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT || 4030;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
dotenv.config();



const db = require('./config/db.config');
db();
const authRoute = require('./routes/authRoutes');
const customers = require('./routes/customersRoute');
const organization = require('./routes/organizationRoute');
const package = require('./routes/packgeRoute');


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
//profile image 
app.use('/profile-images', express.static(path.join(__dirname, 'profile-images')));

//root api middleware
app.use('/api/auth', authRoute);
app.use('/api/users', customers);
app.use('/api/organizations',organization);
app.use('/api/packages',package);

module.exports = app;
