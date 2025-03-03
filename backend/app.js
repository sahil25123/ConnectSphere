import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToSocket from './src/controllers/socketManager.js';
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

const db_url = process.env.MONGO_URI;

const app = express();
const server = createServer(app);

const io = connectToSocket(server);

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.use("/api/v1/users", userRoutes);

// MongoDB Connection
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log("MongoDB Connection Error:", err));

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
