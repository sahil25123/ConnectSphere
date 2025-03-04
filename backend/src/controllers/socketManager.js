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
            connections[path].push(Socket.id);

            timeOnline[Socket.id]= new Date();
            for(let a = 0; a< connections[path].length; a++){
                io.to(connections[path][a]).emit("user-joined", Socket.id ,connections[path])
            }

            if(message[path]!== undefined){
                for(let a = 0;a<message[path].length;a++){

                    io.to(Socket.id).emit("chat-message", message[path][a]["data"],
                        message[path][a]['sender'],message[path][a]["socked-id-sender"])
                        
                }

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
