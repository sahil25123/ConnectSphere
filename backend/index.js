import express from "express";
import  dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./lib/db.js";

dotenv.config();

console.log(process.env.port);

const app = express();

const port = process.env.port||9000;


app.get("/" , (req, res)=>{
    res.send("Hee;p")
});

app.use("/api/auth",authRoutes)



app.listen(port , () =>{
    console.log(`sever is running on this port ${port}`)
    connectDB();
})