const {User}=require("../models/dbschema");

const getAllUsers= async (req, res)=>{
    try {
        const users= await User.find({});
        res.status(201).json({users});
    } catch (error) {
        res.status(403).send(error);
    }
    // res.send("All users")
}

module.exports=getAllUsers