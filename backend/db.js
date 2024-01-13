const mongoose=require('mongoose')

const connectToMongo=async()=>{
     mongoose.connect(process.env.MONGODB_URI)
     .then(()=>{
        console.log("Connected");
     })
     .catch((error)=>{
        console.log("Mongo Db not connected",error);
     })
}
    

module.exports=connectToMongo