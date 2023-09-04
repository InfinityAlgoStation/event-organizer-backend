const express = require('express');
const router = express.Router();
const {getAllCustomers,getCustomer,getCustomerProfile,updateCustomer} = require('../controllers/customerController');
const { authenticate, authorize } = require('../middleware/auth');



router.get('/', authenticate, authorize('admin'), getAllCustomers);
router.get('/:id', authenticate, authorize(['admin', 'partyCenterManager']), getCustomer);
router.get('/my-profile/:id', authenticate, getCustomerProfile);
router.patch('/update-profile/', authenticate, updateCustomer);

module.exports = router;
