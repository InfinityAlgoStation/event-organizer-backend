const multer = require('multer');
const profileImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'profile-images/'); // Specify the directory where profile images will be stored (e.g., 'profile-images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = file.originalname.split('.').pop();
      cb(null, uniqueSuffix + '.' + fileExtension);
    },
});

const profileImageUpload = multer({ storage: profileImageStorage }).single('profileImage');


module.exports = {
    profileImageUpload,
}

