const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
  
const userSchema = new mongoose.Schema({
    username: {
       type: String,
        required:[ true, "You must Enter username"],
        unique: true,
        minlength: 3,
        lowercase: true,
},
password:{
    type: String,
    trim: true,
    required:[true, "You must provide password"]
}

});

  //hash password
  userSchema.pre("save", async function(){
   
    this.password = await bcrypt.hash(this.password, 10)
 });

  //define login value/parameters
 userSchema.statics.login = async function(username, password){
  const user = await this.findOne({username});
   if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
       if (isMatch) {
        return user;
       }
       throw new Error("Provide correct password");

   }
   throw new Error("Email is incorrect");
 }

 // post schema

 const blogPostSchema = new mongoose.Schema({
    BloggerID: {
        type: mongoose.ObjectId,
        require:[ true, "username cannot be empty"],
        ref: "User"
    },
     
    Title:{
       type: String,
       maxlength: 150,
        trim: true
    },
    Contents:{
        type: String
    },
    createdAt:{
        type: Date
    },
    oldTitle:{
        type: String
    },
    oldContent:{
        type: String
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
 });

  module.exports.User = new mongoose.model("User", userSchema);
  module.exports.blogPost = new mongoose.model("blogposts", blogPostSchema);