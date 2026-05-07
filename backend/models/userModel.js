const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:[true,"Please enter fullname"],
        minlength:[3,"minimum of 3 characters required"],
        maxlength:[50,"maximum of 50 characters are allowed"]
    },
    email:{
        type:String,
        required:[true,"Please enter valid email"],
        unique:[true,"This email already  exists"]
    },
    age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Must be at least 18 years old"]
  },
    password:{
        type:String,
        required:[true,"Please enter password"]
    },
      role:{
        type:String,
        enum:['admin','user','seller'],
        default:'user'
    },
    status:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

userSchema.pre("save",async function(){
   if(!this.isModified("password")) return
   this.password=await bcrypt.hash(this.password,Number(process.env.BCRYPT_SALTROUND))

});

const User = mongoose.model("user",userSchema);   //User is a model

module.exports=User;