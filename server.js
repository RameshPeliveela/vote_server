const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const userRouter = require('./routes/userRouter');
const candidateRouter = require('./routes/candidateRouter');
const db = require('./db')
const {authentication, restriction} = require('./middlewares/authorization')

const candidates = require('./models/candidates')
const app = express();
app.use(bodyParser.json())
app.use(cookieParser());
const cors = require('cors');
app.use(cors())
//  authentication, restriction,
app.use('/candidate', candidateRouter);
app.use('/user',userRouter);

app.get('/', async (req, res)=>{
    try{
        const allCandidates = await candidates.find();
        res.status(200).json(allCandidates)
    }
    catch(err){
        console.log(err)
    }

})

const PORT = process.env.PORT || 5000;
app.listen(PORT)
