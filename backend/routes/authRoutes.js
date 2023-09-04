const router = require('express').Router();
const {register,login,forgotPassword,changePassword,resetPassword} = require('../controllers/authController');
const {authenticate} = require('../middleware/auth');


router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password',authenticate, changePassword);


module.exports = router;
