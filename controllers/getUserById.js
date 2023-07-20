const {User}= require('../models/dbschema');


const getUserbyId= async (req, res)=>{

    try {
        const Profile= await User.findById({_id:req.user},'username password');
        res.status(201).json({Profile});
    } catch (error) {
        res.status(403).json({error});
    }
    
}

module.exports=getUserbyId