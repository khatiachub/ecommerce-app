const express=require("express");
const router=express.Router();
const User=require("../models/User")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const CryptoJS = require("crypto-js");
const multer = require('multer');
const sendEmail=require('./sendEmail');
const Token = require("../models/Token");
const crypto=require("crypto")

// Create a storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../images'); // Define the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Define the filename for uploaded files
  },
});
const upload = multer({ storage });

const salt=10

//signup
router.post("/signup", upload.single('image'),async(req,res)=>{
    let {name,lastname,username,email,password,confirmpassword,city,address,phonenumber,image,verified}=req.body
    const newUser = new User({
          username,
          email,
          name,
          lastname,
          city,
          address,
          phonenumber,
          confirmpassword,
          image,
          verified,
        //   password: CryptoJS.AES.encrypt(
        //     password,
        //     process.env.PASS_SEC
        //   ).toString(),
        password
        });
      
        try {
          const user = await newUser.save();
          const token=new Token(
            {
              userId:user._id,
              token:crypto.randomBytes(16).toString("hex")
            }
          )
          await token.save()
          console.log(token);
          const url=`${process.env.BASE_URL}/#/users/${user._id}/verify/${token.token}`
          await sendEmail(user.email,"verify email",url)
          res.status(201).send({message:"Please verify email, link is sent to your account"})
        } catch (err) {
          res.status(500).json(err);
        }
  })


//verify email

router.get("/:id/verify/:token",async(req,res)=>{
  try{
    const token=await Token.findOne({
      token:req.params.token
    })
    console.log(token);
   const info=await User.updateOne({_id:token.userId},{$set:{verified:true}})
   await Token.findByIdAndRemove(token._id)
    return res.status(200).send({message:"Email verified successfully"}) 
  }catch(error){
    return res.status(500).send(error)
  }
})


// signin
router.post("/signin",async(req,res)=>{
    try {
      const user = await User.findOne({ username: req.body.username });
      !user && console.log("wrong username");
      // res.send(401).json("Wrong username!");
  
      // const hashedPassword = CryptoJS.AES.decrypt(
      //   user.password,
      //   process.env.PASS_SEC
      // );
      // const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
  
      // OriginalPassword !== req.body.password &&
        // res.sendStatus(401).json("Wrong password!");
      //   console.log("wrong password");

      if(user?.password!==req.body.password){
         return console.log("incorrect password");
      }

      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        {expiresIn:"10d"}
      );
  
      const { password, ...others } = user._doc;

      if(!user.verified){
        const existingToken = await Token.findOne({ userId: user._id });
        if(existingToken){
          existingToken.updatedAt = new Date();
          await existingToken.save();
          const url = `${process.env.BASE_URL}/#/users/${user._id}/verify/${existingToken.token}`;
          await sendEmail(user.email, "verify email", url);
      
          return res.status(400).json({ message: "Verification email resent" });
        }else{
          const token=new Token(
            {
              userId:user._id,
              token:crypto.randomBytes(16).toString("hex")
            }
          )
          await token.save()
          console.log(token);
            const url=`${process.env.BASE_URL}/#/users/${user._id}/verify/${token.token}`
            await sendEmail(user.email,"verify email",url)
            return res.status(400).json({message:"Please verify email, link is sent to your account"})
        }
      }else{
        return res.status(200).json({...others, accessToken});
      }
    } catch (err) {
      return res.status(500).json(err);
    }
});

module.exports=router