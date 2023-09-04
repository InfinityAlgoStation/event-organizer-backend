const PartyOrganizerModel = require('../models/organizationModel');
const mongoose = require('mongoose')


//add a package 
const addPackage = async (req, res) => {
    const { organizationId, packageName, description, price, place } = req.body;
    try {
        // Get the organization id from the profile
        const partyOrganizer = await PartyOrganizerModel.findById(organizationId);

        // Check if the organizer is found
        if (!partyOrganizer) {
            return res.status(403).json({ message: "Organization is not found" });
        }

        const newPackage = {
            packageName,
            description,
            price,
            place
        }

        // Ensure that the 'packages' field is initialized as an array
        if (!partyOrganizer.packages) {
            partyOrganizer.packages = [];
        }

        partyOrganizer.packages.push(newPackage);
        await partyOrganizer.save();

        res.status(201).json({ message: 'Package added successfully' });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Internal Server Errors" });
    }
}




//update a package 
const updatePackage = async(req,res)=>{
    const {organizationId, packageId} = req.params;
    const {packageName,description,price,place}  = req.body;

    try {
        const PartyOrganizer = await PartyOrganizerModel.findById(organizationId);
       


        if(!PartyOrganizer){
            return res.status(404).json({message:"Organization is not found"})
        }
        // Convert packageId to ObjectId
        const ObjectId = mongoose.Types.ObjectId;
        const packageObjectId = new ObjectId(packageId);

       
        const packageIndex = PartyOrganizer.packages.findIndex(package => package._id.equals(packageObjectId));


        if (packageIndex === -1) {
            return res.status(404).json({ message: "Package is not found" });
        }

        // Update the package at the found index
        PartyOrganizer.packages[packageIndex].packageName = packageName;
        PartyOrganizer.packages[packageIndex].description = description;
        PartyOrganizer.packages[packageIndex].price = price;
        PartyOrganizer.packages[packageIndex].place = place;


        await PartyOrganizer.save();
        
        return res.status(200).json({message:"Package Updated Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
        
    }

}



//delete a package 
const deletePackage = async (req, res) => {
    const { organizationId, packageId } = req.params;

    try {
        const PartyOrganizer = await PartyOrganizerModel.findById(organizationId);

        if (!PartyOrganizer) {
            return res.status(404).json({ message: "Organization is not found" });
        }

        // Find the index of the package with the given packageId
        const packageIndex = PartyOrganizer.packages.findIndex(package => package._id.equals(packageId));

        if (packageIndex === -1) {
            return res.status(404).json({ message: "Package is not found" });
        }

        // Remove the package from the packages array
        PartyOrganizer.packages.splice(packageIndex, 1);

        // Save the PartyOrganizer document
        await PartyOrganizer.save();

        res.status(202).json({ message: "Package Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




module.exports = {
    addPackage,
    updatePackage,
    deletePackage

}






