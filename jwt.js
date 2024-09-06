const jwt = require('jsonwebtoken')

const SECRET_KEY = "1234";
function generateToken(payload){
    const token = jwt.sign(payload, SECRET_KEY);
    return token;
}


function verifyToken(token){
    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    }
    catch(err){
        console.log(err)
    }
}
module.exports = {
    generateToken, verifyToken
}
