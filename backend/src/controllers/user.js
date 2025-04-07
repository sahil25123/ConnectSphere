import httpStatus from "http-status";
import User from "../models/user.js";
import bcrypt from "bcrypt"; 
import crypto from "crypto";  

// LOGIN FUNCTION
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Please provide email and password" });
    }

    try {
        const user = await User.findOne({ email }); // Changed from username to email
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
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
    const { name, email, password } = req.body;

    try {
        // Check if user with this email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a username from the email (using the part before @)
        const username = email.split('@')[0];

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

// GET CURRENT USER FUNCTION
const getCurrentUser = async (req, res) => {
    try {
        // Get token from header
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "No token provided" });
        }
        
        // Find user by token
        const user = await User.findOne({ token });
        
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }
        
        // Return user data (excluding password)
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username
        };
        
        return res.status(httpStatus.OK).json({ user: userData });
    } catch (e) {
        console.error(e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
    }
};

export { login, register, getCurrentUser };
