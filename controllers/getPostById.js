const validate= require("../validators/Joi_validator");
const handleError= require('../handleErrors/handleError');
const {blogPost}= require('../models/dbschema');

const getPostById= async (req, res)=>{
    const {error, value}= validate.PostIDValidation(req.body);
    if(error){
        const errors= handleError.joiErrorHandler(error);
        res.status(403).send(errors);
    }
    else{
        try {
          const post=  await blogPost.findById({_id: value.Post_Id},'Title Contents createdAt updatedAt');
           if(post){
               res.status(201).json({post});
           }
           else{
            res.status(201).json("Post doesn't exist or already deleted.");
           }
          
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports=getPostById