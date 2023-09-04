const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

const dbConnect = (req,res)=>{
    mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log('mongoDb is connected Successfully');
    }).catch((error)=>{
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });
}


module.exports = dbConnect ; 
