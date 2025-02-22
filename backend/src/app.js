import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const server =createServer(app);

const io = new Server(server);
const port =5000
 app.get("/", (req, res) => {
    res.send("Server is ready");
 })


app.listen(port,()=> {
    console.log(`Server is running on port ${port}`);
});
    
 

