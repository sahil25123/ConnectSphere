import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import connectToSocket from './src/controllers/socketManager.js';



 const db_url="mongodb+srv://sahilgupta25123:FOOTBALLGAME@connectsphere.kejc5.mongodb.net/?retryWrites=true&w=majority&appName=ConnectSphere"

const app = express();
const server =createServer(app);

const io = connectToSocket(server)

const port =5000

app.set("port",(process.env.PORT || 5000))
 app.get("/", (req, res) => {
    res.send("Server is ready");
 })

// mongoDB Connection 
mongoose.connect(db_url)
main().then(()=> console.log('MongoDB Connected'))
.catch(err => console.log(err)); 
async function main() {
    await mongoose.connect(db_url);
}
server.listen(port,()=> {
    console.log(`Server is running on port ${port}`);
});
    
 

