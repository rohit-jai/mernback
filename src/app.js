const express = require("express");
const port = process.env.port || 3000;
require("../src/db/conn");
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/registers")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const temp_path = path.join(__dirname,"../template/views");
const partials_path = path.join(__dirname,"../template/partials");
app.set("view engine", "hbs");
app.set("views",temp_path);
hbs.registerPartials(partials_path);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res)=>{
    res.render("index");
})

app.get("/login", (req,res)=>{
    res.render("login");
})



app.get("/regis", (req,res)=>{
    res.render("register");
})

app.post("/register",async (req,res)=>{
   try{
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if(password === cpassword)
    {
            // const empregister = new Register({
            //     firstname : req.body.firstname,
            //     lastname : req.body.lastname,
            //     email : req.body.email,
            //     gender : req.body.gender,
            //     phone : req.body.phone,
            //     age :req.body.age,
            //     password : password,
            //     confirmpassword:cpassword
            // })
            
            const empregister = new Register(req.body);
            console.log("the sucess part "+empregister);
            const token = await empregister.generateAuthToken();

             const result = await empregister.save();
             console.log("the sucess part "+empregister);
             res.status(201).render("login");
    }
    else
    {
        res.send("passsord is not match ");
    }
   }catch(err){
       res.status(400).send(err);
   }
})
 
app.post("/login", async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
      const useremail = await Register.findOne({email:email});
      
      const ismatch = await  bcrypt.compare(password, useremail.password);
      const token = await useremail.generateAuthToken();
      console.log("the token part "+ token);
      
      if(ismatch){
          res.status(200).render("index");
      }else{
          res.send("invalid password detils");
      }
        

    }catch(err){
        res.status(400).send("invalid page logins ");
    }
})


app.listen(port,()=>{
    console.log(`connection sucressfull on ${port}`);
})