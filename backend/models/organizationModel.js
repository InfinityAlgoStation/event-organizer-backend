const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    packageName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
});
  

const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,   
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  organizationBio:{
    type:String,
    required:false
  },
  profileImage:{ 
    type:String,
    required: false,
  },
  packages: [packageSchema], // an array of objects
});

const PartyOrganizer = mongoose.model('PartyOrganizer', organizationSchema);

module.exports = PartyOrganizer;
