const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/studentreg",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`db is connected`);
}).catch((e)=>{
    console.log('db is not connected');
})