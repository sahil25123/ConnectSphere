import httpStatus from "http-status";
import User from "../models/user.js";
import bcrypt from "bcrypt"; 
import crypto from "crypto";  

// LOGIN FUNCTION
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Please provide username and password" });
    }

    try {
        const user = await User.findOne({ username }); // ✅ Corrected method
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password); // ✅ Corrected bcrypt.compare
        if (!isMatch) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });
        }

        // Generate token
        let token = crypto.randomBytes(20).toString("hex");
        user.token = token;
        await user.save();

        return res.status(httpStatus.OK).json({ message: "Login successful", token });
    } catch (e) {
        console.error(e); 
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

// REGISTER FUNCTION
const register = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ username }); // ✅ Corrected findOne method
        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // ✅ Corrected bcrypt.hash

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User registered successfully" });
    } catch (e) {
        console.error(e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

export { login, register };
