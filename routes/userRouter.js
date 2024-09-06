const express = require('express')
const {postUserSignup, postUserSignin, getUserProfile, userCastingVote, getUserCandidates} = require('../controllers/userController');
const {authentication} = require('../middlewares/authorization')

const router = express.Router();

router.post('/signup',postUserSignup);

router.post('/signin', postUserSignin);

router.get('/profile/', authentication, getUserProfile)

router.get('/candidates', authentication, getUserCandidates)

router.post('/vote/:candidateId', authentication, userCastingVote)

module.exports = router;
