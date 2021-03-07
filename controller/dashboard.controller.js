const db = require('../dbconnectors/sqlite-connector')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
// const fetch = require("node-fetch")
// const multer = require("multer")
const path = require("path");
// const IPFS = require('ipfs')


//SignUp Controller
async function main(req,res,next) {
    // database query

    const user ={name: "bbb", email:"123@qq.com"}

    res.render("index", user)
  }
  
  //Login Controller
async function login(req,res,next){
    res.render("login")
}

async function signup(req,res,next){
  res.render("signup")
}

async function signup_form(req,res,next){
  const salt = await bycrypt.genSalt(10);
  hashpassword = await bycrypt.hash(req.body.password, salt)

  const emailExist = await db.user.findOne({where:{email: req.body.email}})
  if(emailExist){
     res.status(400).json({"error":'Email already Exist'}) 
  }

  const user =  new db.user({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword
  })
  try{
    const userSignup = await user.save()
    const payload = {
      user: {
        id: userSignup.id
      }
    };
    jwt.sign(payload,"anystring",{expiresIn: 10000},function(err, token)
    {
      if(err){
        res.send(err)
      }
      res.render("index", {
        token,
        userSignup
      })
    })
  } 
  catch(err){
    res.status(400).json({'error':err})
  }
}

// async function login_form(req,res,next){
//   const username = req.body.email
//   const password = req.body.password

//   const response = await fetch('http://127.0.0.1:8000/account/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: "email=dsf@gmail.com&password=123456789"
//   })
//   //...
//   // Extract the JWT from the response
//   const jwt_token =await  response.headers.get('auth-token')
//   //...
//   // Do something the token in the login method
//   // await login({ jwt_token })
//   res.cookie('token', jwt_token)
//   // req.session.auth-token = jwt_token;
//   // res.redirect('/account/api/user');
//   res.redirect('/');
//   //res.render("login")
// }





// var storage = multer.diskStorage({ 
//   destination: function (req, file, cb) { 

//       // Uploads is the Upload_folder_name 
//       cb(null, "uploads") 
//   }, 
//   filename: function (req, file, cb) { 
//     cb(null, file.fieldname + "-" + Date.now()+".jpg") 
//   } 
// }) 
     
// // Define the maximum size for uploading 
// // picture i.e. 1 MB. it is optional 
// const maxSize = 1 * 1000 * 1000; 
  
// var upload = multer({  
//   storage: storage, 
//   limits: { fileSize: maxSize }, 
//   fileFilter: function (req, file, cb){ 
  
//       // Set the filetypes, it is optional 
//       var filetypes = /jpeg|jpg|png/; 
//       var mimetype = filetypes.test(file.mimetype); 

//       var extname = filetypes.test(path.extname( 
//                   file.originalname).toLowerCase()); 
      
//       if (mimetype && extname) { 
//           return cb(null, true); 
//       } 
    
//       cb("Error: File upload only supports the "
//               + "following filetypes - " + filetypes); 
//     }  

// // mypic is the name of file attribute 
// }).single("mypic");        

// async function uploadFile (req, res, next) { 
        
//   // Error MiddleWare for multer file upload, so if any 
//   // error occurs, the image would not be uploaded! 
//   upload(req,res,function(err) { 

//       if(err) { 

//           // ERROR occured (here it can be occured due 
//           // to uploading image of size greater than 
//           // 1MB or uploading different file type) 
//           res.send(err) 
//       } 
//       else { 

//           // SUCCESS, image successfully uploaded 
//           res.send("Success, Image uploaded!") 
//       } 
//   }) 
// }




// async function main () {
//   const node = await IPFS.create({silent: true})

//   const filesAdded = await node.add({
//     path: 'hello.txt',
//     content: Buffer.from('Hello World 101')
//   })

//   const fileBuffer = await node.cat(filesAdded[0].hash)

//   console.log('Added file contents:', fileBuffer.toString())

// }





async function contracts(req,res,next){
    res.render("parts/contracts")
}
  

  
  module.exports = {
    main,
    login,
    contracts,
    signup,
    signup_form
    // login_form,
    // uploadFile
  }