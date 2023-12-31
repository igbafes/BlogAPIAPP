const jwt = require('jsonwebtoken');
require('dotenv').config();
const {User} = require('../models/dbschema');

const verifyToken = async (req, res, next) => {
   const token = req.cookies.jwToken;

    if (token){
        jwt.verify(token, process.env.SECRET_KEY, async (error, decodedToken) => {
          if (error || !decodedToken) {
            req.user=null;
            res.status(400).send("Access denied...");
          } else{
            let userId = await User.findById(decodedToken._id);
            req.user = userId._id;
             next();
          }

        })

    } else {
      req.user = null;
      res.status(400).send("Access denied...");
    }

}

module.exports = verifyToken