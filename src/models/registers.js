const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 const employeeSchema = new mongoose.Schema({
     firstname:{
         type:String,
         require:true,
     },
     lastname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    gender:{
        type:String,
        require:true,
    },
    phone:{
        type:Number,
        require:true,
        unique:true
    },
    age:{
        type:Number,
        require:true,
    },
    password:{
        type:String,
        require:true,    
    },
    confirmpassword:{
        type:String,
        require:true,    
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }]
 })
 // today we are going for the make a jwt tokern 
 employeeSchema.methods.generateAuthToken = async function(){
     try{
         console.log(this._id);
         const token = jwt.sign({_id:this._id.toString()},"mynameisrohitjaiswalworkingonnodejs");
         this.tokens = this.tokens.concat({token:token})
         await this.save();
         console.log(token);
         return token;

     }catch(err){
         res.send("the error part " + err);
         console.log("the error part " + err);
     }
 }

  
// this section is used for the make password hash form 
 employeeSchema.pre("save", async function(next){
     if(this.isModified("password")){
         console.log(`the cureent password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the cureent password is ${this.password}`);
        this.confirmpassword = undefined;
     }
     next();
 })


 // now we are create a collection
 const Register = new mongoose.model("Register",employeeSchema);

 module.exports = Register;