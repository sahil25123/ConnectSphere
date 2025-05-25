import User from "../models/user.js";

export const signup= async (req,res) =>  {
    const {fullName , email , password , confirmPassword} = req.body;

    try{
        if(password !== confirmPassword){
        return res.status(400).json({error:"Both Password doesnt match"})
    }
    const user = await User.findOne({email})
    if(email) {
        return res.status(400).json({error:"Email already in use"});
    }

    }
    catch(e){
        console.log("Error Occured in the signupController")
    }

    
    

}

export const login= (req,res) =>{
    res.send("login page")

}