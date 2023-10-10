const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema(

    { 
        image:{type:String,required:false},
        name:{type:String,required:true},
        lastname:{type:String,required:true},
        username:{type:String,required:true, unique:true},
        phonenumber:{type:Number,required:true},
        address:{type:String||Number,required:true},
        city:{type:String,required:true},
        email:{type:String,required:true, unique:true},
        password:{type:String,required:true},
        confirmpassword:{type:String,required:true},
        isAdmin:{
            type:Boolean,
            default:false
        },
    },
    {timestamps:true}
)
const User=mongoose.model("User",UserSchema)
module.exports= User