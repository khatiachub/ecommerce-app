const express=require("express");
const router=express.Router();
const User=require("../models/User")
//password handler
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const app = express();



//signup
router.post("/signup",(req,res)=>{
    let {username,email,password}=req.body
    if (username !== undefined && email !== undefined && password !== undefined) {
        username = username.trim();
        email = email.trim();
        password = password.trim();
    }
    if(username==""||email==""||password==""){
        return res.json({
            status:"FAILED",
            message:"Empty input fields"
        })
    }else if( !/^[a-zA-Z ]*$/.test(username)){
        return res.json({
            status:"FAILED",
            message:"Invalid username entered"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        return res.json({
            status:"FAILED",
            message:"Invalid email"
        })
    }else if(password.length<8){
       return res.json({
            status:"FAILED",
            message:"Password is too short"
        })
    }else{
        User.find({email}).then(result=>{
            if(result.length){
               return res.json({
                    status:"FAILED",
                    message:"user with the provided email already exists!"
                })
            }else{
                const saltRounds=10;
                bcrypt.hash(password,saltRounds).then(hashedPassword=>{
                    const newUser=new User({
                        username,
                        email,
                        password:hashedPassword,
                    })
                    newUser.save().then(result=>{
                        return res.json({
                            status:"SUCCESS",
                            message:"Signup is successful!",
                            data:result
                        })
                    })
                    .catch(err=>{
                        return res.json({
                            status:"FAILED",
                            message:"An error occured while saving the user account!"
                        })
                    })
                })
                .catch(err=>{
                    return res.json({
                        status:"FAILED",
                        message:"An error occured while ashing password!"
                    })
                })
            }
        }).catch(err=>{
            console.log(err);
            return res.json({
                status:"FAILED",
                message:"An error occured while checking for existing user!"
            })
        })
    }

})


//signin
router.post("/signin",async(req,res)=>{

    const user = await User.findOne(
        {
            userName: req.body.username
        }
    );
    const{email,password}=req.body
    const users={id:user.id,isAdmin:user.isAdmin}
    if(email!==undefined){
        const accessToken=jwt.sign(users,process.env.JWT_SEC,{ expiresIn:"3d"})
        return res.json({accessToken,users})
    }
    if (email !== undefined && password !== undefined) {
          email.trim();
          password.trim();
    }
    if(email==""||password==""){
        return res.json({
            status:"FAILED",
            message:"Empty input fields"
        })
    }else{
        User.find({email})
        .then(data=>{
            if(data.length){
                const hashedPassword=data[0].password
                bcrypt.compare(password,hashedPassword).then(result=>{
                    if(result){
                        return res.json({
                            status:"SUCCESS",
                            message:"signin successful",
                            data:data
                        })
                    }else{
                        return res.json({
                            status:"FAILED",
                            message:"ivalid password entered"
                        })
                    }
                })
                .catch(err=>{
                    return res.json({
                        status:"FAILED",
                        message:"An error occured while comparing passwords"
                    })
                })
            }else{
                return res.json({
                    status:"FAILED",
                    message:"Invalid credentials"
                })
            }
        })
        .catch(err=>{
            return res.json({
                status:"FAILED",
                message:"An error occured while checking existing user"
            })
        })
    }
})




module.exports=router