const {User} =require("../models/dbschema");
const validator = require("../validators/Joi_validator");
const handleError = require("../handleErrors/handleError");

const updateUser= async(req, res)=>{
    const {error, value} =validator.updateUserValidation(req.body);
    if(error){
        const errors=handleError.joiErrorHandler(error);
        res.status(403).send(errors);
    }
    else{
    try {
        const userUpdate= await User.findByIdAndUpdate({_id:req.user}, {username:value.username, password:value.password});
        res.status(201).json({"Profile updated": userUpdate});
    } catch (error) {

        res.status(403).json({error});
    }
}
}

module.exports=updateUser;