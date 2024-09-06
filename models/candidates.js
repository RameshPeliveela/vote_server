const {model, Schema} = require('mongoose');
const candidateSchema = Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    party:{
        type:String,
        required:true
    },
    constituency:{
        type:String,
        required:true
    },
    voteCount:{
        type:Number,
        default:0
    }
})

const candidate = model('candidates', candidateSchema)

module.exports = candidate;
