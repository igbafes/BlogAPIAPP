const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: '45m'})
}

module.exports = createToken