const candidates = require('../models/candidates')

async function addCandidate(req, res){
    try{
        const {party, constituency} = req.body;
        const result = await candidates.findOne({party: party, constituency:constituency})
        if(result){
            return res.status(400).json({Error: 'Already candidate exist', candidate:result})
        }
        const newCandidate = new candidates(req.body)
        const response = await newCandidate.save();
        res.status(201).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error: 'Internal server Error'})
    }
}


async function updateCandidate(req, res){
    try{
        const {id} = req.params;
        const newData = req.body;
        await candidates.findByIdAndUpdate(id, newData);
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: 'Internal server Error'})
    }

}

async function deleteCandidate(req, res){
    try{
        const {id} = req.params;
        await candidates.findByIdAndDelete(id)
        res.status(200).json({Message: 'Data has been deleted successfully'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error: 'Internal server Error'})
    }
}
module.exports = {addCandidate, updateCandidate, deleteCandidate}