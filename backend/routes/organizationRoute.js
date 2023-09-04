const router = require('express').Router();
const {createOrganizationProfile,organizationProfile,organizationProfileUpdate} = require('../controllers/organizationController');
const { authenticate, authorize } = require('../middleware/auth');



router.post('/update-profile/:id',authenticate, authorize('partyCenterManager'),organizationProfileUpdate);
router.get('/profile/:id',authenticate, authorize('partyCenterManager'),organizationProfile);
router.post('/profile-create',authenticate, authorize('partyCenterManager'),createOrganizationProfile);


module.exports = router;


