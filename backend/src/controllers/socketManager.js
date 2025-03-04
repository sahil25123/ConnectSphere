import { connect } from "mongoose"
import {Server, Socket} from "socket.io"

let connections = []
let message = []
let timeOnline= []




const connectToSocket = (server) =>{
    const io = new Server(server)
    io.on("connection",(Socket)=>{
        Socket.on("accept-call",(path)=>{
            if(connections[path]=== undefined){
                connections[path]=[]
            }
            
        })
        Socket.on("signal",(toID,message)=>{
            io.to(toID).emit("signal",Socked.id,message)
        });

        Socket.on("chat-message",(data,sender)=>{

        })

        Socket.on("disconnect",()=>{
            console.log("User Disconnected")
        })

    })
}

export default connectToSocket;
