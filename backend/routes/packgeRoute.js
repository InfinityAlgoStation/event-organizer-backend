const router = require('express').Router();
const { authenticate, authorize } = require('../middleware/auth');
const {addPackage,updatePackage,deletePackage} = require('../controllers/packageController');






router.post('/add-new-package', authenticate, authorize('partyCenterManager'),addPackage);
router.put('/update-package/:organizationId/:packageId', authenticate, authorize('partyCenterManager'),updatePackage);
router.delete('/delete-package/:organizationId/:packageId',authenticate,authorize('partyCenterManager'),deletePackage);


module.exports = router ;