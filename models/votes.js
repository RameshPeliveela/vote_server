const {model, Schema} = require('mongoose');
const user = require('./users')
const candidate = require('./candidates')
const voteSchema = Schema({
    voter:{
        type:Schema.Types.ObjectId,
        ref:user
    },
    votedTo:{
        type:Schema.Types.ObjectId,
        ref:candidate
    }
}, {timestamps:true})

const votes = model('votes', voteSchema)
module.exports = votes;
