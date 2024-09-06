const {model, Schema} = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    mobile:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    constituency:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ['ADMIN', 'VOTER'],
        default: 'VOTER'
    },
    aadhaarNumber:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isVoted:{
        type:Boolean,
        enum:[true, false],
        default:false
    },
}, {timestamps:true})

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
        
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        
    }
    catch(err){
        console.log(err)
    }
    next();
})

userSchema.methods.comparePassword = async function(typedPassword){
    try{
        const result = await bcrypt.compare(typedPassword, this.password);
        return result;
    }
    catch(err){
        console.log(err)
    }
}

const user = model('users', userSchema);

module.exports = user
