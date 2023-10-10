const express=require("express");
const router=express.Router();
const User=require("../models/User")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const CryptoJS = require("crypto-js");
const { ImageList } = require("@mui/material");

const multer = require('multer');

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

//signup
router.post("/signup", upload.single('image'),async(req,res)=>{
    let {name,lastname,username,email,password,confirmpassword,city,address,phonenumber,image}=req.body
    // const image = req.file ? req.file.path : ''; 
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
          password: CryptoJS.AES.encrypt(
            password,
            process.env.PASS_SEC
          ).toString(),
        });
      
        try {
          const savedUser = await newUser.save();
          // User.create({image:image})
          res.status(201).json(savedUser);
        } catch (err) {
          res.status(500).json(err);
        }
        })




    // if (username !== undefined 
    //     && email !== undefined
    //     && password !== undefined
    //     &&name!==undefined
    //     &&lastname!==undefined
    //     &&address!==undefined
    //     &&city!==undefined
    //     &&phonenumber!==undefined
    //     &&img!==undefined
    //     ) {
    //     username = username.trim();
    //     email = email.trim();
    //     password = password.trim();
    //     name = name.trim();
    //     lastname =lastname.trim();
    //     confirmpassword = confirmpassword.trim();
    //     address = address.trim();
    //     city = city.trim();
    //     img=img.trim();
    // }
    // if(username===""
    // ||email===""
    // ||password===""
    // ||name===""
    // ||lastname===""
    // ||confirmpassword===""
    // ||city===""
    // ||address===""
    // ||phonenumber===""
    // ||img===""
    // ){
    //     return res.json({
    //         status:"FAILED",
    //         message:"Empty input fields"
    //     })
    // }else if( !/^[a-zA-Z ]*$/.test(username)){
    //     return res.json({
    //         status:"FAILED",
    //         message:"Invalid username entered"
    //     })
    // }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
    //     return res.json({
    //         status:"FAILED",
    //         message:"Invalid email"
    //     })
    // }else if(password.length<8){
    //    return res.json({
    //         status:"FAILED",
    //         message:"Password is too short"
    //     })
    // }else if( !/^[a-zA-Z ]*$/.test(name)){
    //     return res.json({
    //         status:"FAILED",
    //         message:"Invalid name entered"
    //     })
    // }
    // else{
    //     User.find({email}).then(result=>{
    //         if(result.length){
    //            return res.json({
    //                 status:"FAILED",
    //                 message:"user with the provided email already exists!"
    //             })
    //         }else{
    //             const saltRounds=10;
    //             bcrypt.hash(password,saltRounds).then(hashedPassword=>{
    //                 const newUser=new User({
    //                     name,
    //                     lastname,
    //                     username,
    //                     email,
    //                     password:hashedPassword,
    //                     confirmpassword,
    //                     city,
    //                     phonenumber,
    //                     address,
    //                     img
    //                 })
    //                 newUser.save().then(result=>{
    //                     return res.json({
    //                         status:"SUCCESS",
    //                         message:"Signup is successful!",
    //                         data:result
    //                     })
    //                 })
    //                 .catch(err=>{
    //                     return res.json({
    //                         status:"FAILED",
    //                         message:"An error occured while saving the user account!"
    //                     })
    //                 })
    //             })
    //             .catch(err=>{
    //                 return res.json({
    //                     status:"FAILED",
    //                     message:"An error occured while hashing password!"
    //                 })
    //             })
    //         }
    //     }).catch(err=>{
    //         console.log(err);
    //         return res.json({
    //             status:"FAILED",
    //             message:"An error occured while checking for existing user!"
    //         })
    //     })
    // }




// signin
router.post("/signin",async(req,res)=>{
//     const{password,username}=req.body
//     const user = await User.findOne(
//         {
//             username: req.body.username,
//         }
//     );
//     !user && res.status(401).json("Wrong username");

//     // const hashedPassword = CryptoJS.AES.decrypt(
//     //     user.password,
//     //     process.env.PASS_SEC
//     //   );
//     // const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
//     // OriginalPassword !== req.body.password &&
//     //   res.status(401).json("Wrong password!");

//     if(username!==undefined){
//         const accessToken = jwt.sign(
//             {
//                 id: user?._id,
//                 isAdmin: user?.isAdmin,
//             },
//             process.env.JWT_SEC,
//                 {expiresIn:"3d"}
//             );
//             if(user){
//                 const { ...others } = user._doc;  
//                 return res.json({accessToken,...others})
//             }else{
//                 return 
//             }
//     }
    
//     if (username !== undefined && password !== undefined) {
//           username.trim();
//           password.trim();
//     }
//     if(username==""||password==""){
//         return res.json({
//             status:"FAILED",
//             message:"Empty input fields"
//         })
//     }else{
//         User.find({password})
//         .then(data=>{
//             if(data.length){
//                 const hashedPassword=data[0].password
//                 bcrypt.compare(password,hashedPassword).then(result=>{
//                     if(result){
//                         return res.json({
//                             status:"SUCCESS",
//                             message:"signin successful",
//                             data:data
//                         })
//                     }else{
//                         return res.json({
//                             status:"FAILED",
//                             message:"ivalid password entered"
//                         })
//                     }
//                 })
//                 .catch(err=>{
//                     return res.json({
//                         status:"FAILED",
//                         message:"An error occured while comparing passwords"
//                     })
//                 })
//             }else{
//                 return res.json({
//                     status:"FAILED",
//                     message:"Invalid credentials"
//                 })
//             }
//         })
//         .catch(err=>{
//             return res.json({
//                 status:"FAILED",
//                 message:"An error occured while checking existing user"
//             })
//         })
//     }


try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user?.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
       res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password, ...others } = user._doc;

   return res.status(200).json({accessToken,...others});
  } catch (err) {
    return res.status(500).json(err);
    console.log(err);
  }
});

module.exports=router