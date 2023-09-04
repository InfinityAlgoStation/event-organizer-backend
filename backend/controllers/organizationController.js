const PartyOrganizer  = require('../models/organizationModel');

//creating  profile 
const createOrganizationProfile = async (req, res) => {
    try {
      const organizationProfileData = req.body;
  
      // Create the organization profile document with the correct structure
      const organizationProfile = new PartyOrganizer({
        ...organizationProfileData,
      });

      await organizationProfile.save();
      res.status(201).json({ message: 'Organization profile created successfully' });
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: 'An error occurred while creating the organization profile' });
    }
};
  


//organization profile
const organizationProfile = async (req, res) => {
    try {
        // Find the user id
        const orgId = req.params.id;
        // Use async/await to wait for the findById operation
        const organization = await PartyOrganizer.findById(orgId);

        if (!organization) {
            return res.status(404).json({ message: "Organization is not found" });
        }

        // Only send a response here, no need to return
        res.status(200).json(organization);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// update organization profile 
const organizationProfileUpdate = async(req,res)=>{
    //get organization profile 
    try {
        const orgId = req.params.id;
        const updatedProfile = req.body; 
        await PartyOrganizer.findOneAndUpdate({user: orgId},updatedProfile);
        res.status(200).json({ message: 'Organization profile updated successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the organization profile' });
    }
}





module.exports = {
    organizationProfile,
    organizationProfileUpdate,
    createOrganizationProfile
}