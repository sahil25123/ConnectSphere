
import httpStatus from "http-status"
import User from "../models/user.js"; // ✅ Correct for ESM


import bycrpt from "bcrypt"

const login = async(req,res)=>{

        const {username, password}= req.body
        if(!username || !password)
            {
            return res.status(400).json({message:"Please Provide"})

        }

        try{
            const user =  await user.find(username);
            if(!user){
                return res.status(httpStatus.NOT_FOUND).json({message:"User not found"})
            }
            if(bycrpt.compare(password , user.password)){
                let token = crypto.randomBytes(20).toString("hex")
                user.token = token;
                await user.save()
                return res.status(httpStatus.OK).json({message:"Login In Successfully"})
            }


        }
        catch(err){
            res.json({message:"Something Went Wrong"})

        }


}

const register = async(req, res)=>{
    const {name, username ,password} =req.body;

    try{
        const existingUser = await User.findOne("username")
            if(existingUser){
                return res.status(httpStatus.FOUND).json({
                    message:"User Already Exists"
                })
            }
        const hashedPassword = await bycrpt.hash(password, 10);

        const newUser = new user ({
            name:name,
            username : username,
            password: hashedPassword
        })
        await newUser.save();

        res.status(httpStatus.CREATED).json({
            message:"USer Register Successuly"
        })


    }
    catch(e){
        res.json({message:"Something Went Wrong"})
    }

}

export {login, register};

