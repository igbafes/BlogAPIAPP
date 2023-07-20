const validate= require("../validators/Joi_validator");
const handleError= require('../handleErrors/handleError');
const {blogPost}= require('../models/dbschema');


const deletePost= async (req, res)=>{
    const {error, value}= validate.PostIDValidation(req.body);
    if(error){
        const errors= handleError.joiErrorHandler(error);
        res.status(403).send(errors);
    }
    else{
        try {
          const post=  await blogPost.findByIdAndDelete({_id: value.Post_Id});
           if(post){
               res.status(201).json("Post deleted successfully");
           }
           else{
            res.status(201).json("Post doesn't exist or already deleted.");
           }
          
        } catch (error) {
            console.log(error);
        }

    }

}
module.exports=deletePost