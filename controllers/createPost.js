const {blogPost} =require('../models/dbschema');
const validator = require('../validators/Joi_validator');
const handleError = require('../handleErrors/handleError');


const createPost= async (req, res)=>{
    const {error, value}= validator.postValidator(req.body);
    if(error){
        const errors= handleError.joiErrorHandler(error);
        res.status(406).send(errors);
    }
    else{
        try {
            const post= new blogPost({
                BloggerID: req.user,
                Title: value.Title,
                Contents: value.Content,
                createdAt: new Date(),
                updatedAt: null,
                oldTitle:null,
                oldContent:null,

            })
            const newPost= await post.save();
            res.status(201).json("Post successfully created")
        } catch (error) {
            res.status(403).json(error);
            
        }
    }
}

module.exports=createPost;