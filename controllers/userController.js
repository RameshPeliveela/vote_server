const users = require('../models/users')
const {generateToken} = require('../jwt');
const candidates = require('../models/candidates')
const votes = require('../models/votes')

//User SignUp
async function postUserSignup(req, res){
    try{
        const data = req.body;
        const newUser = new users(data);
        const response = await newUser.save();
        res.status(201).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: 'Error in saving data'})
    }
}

//user signin
async function postUserSignin(req, res){
    try{
        const {aadhaarNumber, password} = req.body
        const user = await users.findOne({aadhaarNumber: aadhaarNumber})
        if(!user){
            return res.status(404).json({Error: 'User not found please register yourslef...'})
        }
        const result = await user.comparePassword(password);
        if(!result){
            return res.status(404).json({Error: 'Incorrect Password'})
        }
        const payload = {
            id:user.id,
            aadhaarNumber:user.aadhaarNumber
        }
        const token = generateToken(payload)
        res.status(200).json({Token :token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error: 'internal Error in signin'})
    }
}

//user profile
async function getUserProfile(req, res){
    const {id} = req.user;
    const user = await users.findById(id)
    res.status(200).json({user: user})
}

//casting vote
async function userCastingVote(req, res){
    try{
        const {candidateId} = req.params;
        const {id} = req.user;
        const user = await users.findById(id)
        if(user.role === 'ADMIN'){
            return res.status(400).json({Error: `Admin can't caste their vote`})
        }

        if(user.isVoted){
            return res.status(400).json({Error: 'You have casted your vote already'})
        }

        const candidate = await candidates.findById(candidateId);
       
        if(!candidate){
            return res.status(400).json({Error: 'Their is no candidate with this id'})
        }

        const result = user.constituency === candidate.constituency;
        if(!result){
            return res.status(400).json({Error:' Please vote to your constituency candidate'})
        }
        user.isVoted = true;
        candidate.voteCount++;
        await user.save();
        await candidate.save();
        await votes.create({
            voter:id,
            votedTo:candidateId
          });
          res.status(200).json({Message: 'Thanks for casting your valuable vote'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: 'Internal sever Error'})
    }
}

//user candidates
async function getUserCandidates(req, res){
    try{
        const {id} = req.user;
        const user = await users.findById(id)
        const {constituency} = user
        const userCandidates = await candidates.find({constituency:constituency})
        res.status(200).json(userCandidates)
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error: 'Internal server Error'})
    }

}
module.exports = {
    postUserSignup, postUserSignin, getUserProfile, userCastingVote, getUserCandidates
}
