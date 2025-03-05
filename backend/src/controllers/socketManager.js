import { Server } from "socket.io";

let connections = {}; // Store connected users
let messages = {}; // Store chat messages per room
let timeOnline = {}; // Store user connection times

const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Allow all origins (change for security)
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);

        // User joins a call
        socket.on("accept-call", (room) => {
            if (!connections[room]) {
                connections[room] = [];
            }
            connections[room].push(socket.id);
            timeOnline[socket.id] = new Date();

            // Notify all users in the room
            connections[room].forEach((userId) => {
                io.to(userId).emit("user-joined", socket.id, connections[room]);
            });

            // Send previous chat messages if available
            if (messages[room]) {
                messages[room].forEach(({ data, sender, socketId }) => {
                    io.to(socket.id).emit("chat-message", data, sender, socketId);
                });
            }
        });

        // Handle WebRTC signaling
        socket.on("signal", (toID, message) => {
            io.to(toID).emit("signal", socket.id, message);
        });

        // Handle chat messages
        socket.on("chat-message", (data, sender) => {
            let room = null;

            // Find the room the sender is in
            for (const [roomKey, users] of Object.entries(connections)) {
                if (users.includes(socket.id)) {
                    room = roomKey;
                    break;
                }
            }

            if (room) {
                if (!messages[room]) {
                    messages[room] = [];
                }
                messages[room].push({ data, sender, socketId: socket.id });

                // Send message to everyone in the room
                connections[room].forEach((userId) => {
                    io.to(userId).emit("chat-message", data, sender, socket.id);
                });
            }
        });

        // Handle user disconnect
        socket.on("disconnect", () => {
            console.log(`User Disconnected: ${socket.id}`);

            let roomToDelete = null;

            for (const [room, users] of Object.entries(connections)) {
                const index = users.indexOf(socket.id);
                if (index !== -1) {
                    users.splice(index, 1); // Remove user from the room
                    roomToDelete = room;

                    // Notify other users in the room
                    users.forEach((userId) => {
                        io.to(userId).emit("user-left", socket.id, users);
                    });

                    break; // Stop after finding the user
                }
            }

            // If the room is empty, delete it
            if (roomToDelete && connections[roomToDelete].length === 0) {
                delete connections[roomToDelete];
                delete messages[roomToDelete];
            }

            delete timeOnline[socket.id];
        });
    });
};

export default connectToSocket;
