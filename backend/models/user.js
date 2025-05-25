import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName :{
        required:true,
        type:String   
},
email:{
   required:true,
   type:String,
   unique:true
},
password:{
    required:true,
    type:String,
    minlength:8
},
bio:{
    type:String,
    default:""
},
profilePic:{
    type:String,
    default:""
},
nativeLanguage: {
      type: String,
      default: "",
    },
    learningLanguage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friends:[
        {
            type :mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]

},{timestamps:true});

const User = mongoose.model("User" , UserSchema)

export default User;