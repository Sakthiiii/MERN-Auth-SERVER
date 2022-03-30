const mongoose= require("mongoose");

const connenctDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true
        });
        console.log("MongoDB connected")
    }catch(error){
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
}
module.exports= connenctDB;