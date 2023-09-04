const PartyOrganizer = require('../models/organizationModel');

// Search organization by name or location 
const SearchOrganization = async (req,res)=>{
    const {searchQuery} = req.query; 
    try {
        //search by organizationName and location 
        const searchResults = await PartyOrganizer.find({
            $or:[
                {organizationName:{$regex:searchQuery, $options:'i'}},
                {location:{$regex: searchQuery, $options:'i'}}
            ]
        });
        
        //if not found the Data 
        if(searchResults.length === 0){
            return res.status(404).json({message:"No Matching Organization is found here"});
        }

        res.status(200).json(searchResults);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }


}


// search package by name, place, price 
const SearchPackage = async (req,res)=>{
    const {searchQuery} = req.query;
    try {
        //search by packageName,place and price 
        const SearchResults = await PartyOrganizer.find({
            'packages.$or':[
                {'packages.packageName':{$regex:searchQuery, $options:'i'}},
                {'packages.place':{$regex:searchQuery, $options: 'i'}},
                {'packages.price':parseFloat(searchQuery)}

            ]
        });
        //if not found the seraching data 
        if(SearchResults.length === 0){
            return res.status(404).json({message:"No Matching Package is found"})
        }

        res.status(200).json(SearchResults);

        
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"});
        
    }

}



module.exports = {
    SearchOrganization,
    SearchPackage,
}
