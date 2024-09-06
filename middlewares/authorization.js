const {verifyToken} = require('../jwt')
const users = require('../models/users');

function authentication(req, res, next){    
    const token = req.headers['authorization'];    
    if(!token){
        return res.status(404).json({Error: 'Please signin'})
    }
    const payload = verifyToken(token);
    if(!payload){
        return res.status(404).json({Error: 'Invalid token'})
    }
    req.user = payload;
    next();

}

async function restriction(req, res, next){
    try{
        const {id} = req.user
        const user = await users.findById(id)
        const respnse = user.role === 'ADMIN';
        if(!respnse){
            return res.status(400).json({Error: 'you are not an admin'})
        }
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: 'Internal server error'})
    }
}

module.exports = {authentication, restriction}
