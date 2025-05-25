import mongoose from "mongoose";

const connectDB = async  () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");

    }
    catch(e){
        console.log("Error Occured:" , e)
        process.exit(1);
    }
}

export default connectDB;
