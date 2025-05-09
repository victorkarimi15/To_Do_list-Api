const mongoose = require('mongoose');
const {Schema} = mongoose;

// one can use a schema generator function
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        lowercase: true
    },
    refreshToken :{
        type: String,
        default: null
    },
    task: [{
        title : {type: String, required: true},
        time :{
            type: Date,
            default: Date.now()
        },
        description: String
    }], 
    // "page": 1, page: { type: Number, default: 1 }, // ✅ correct
    // "limit": 10,
    // "total": 2

});

userSchema.index({task : 1}, {unique: true});

userSchema.methods.getAllTasks = function() {
    return this.task;
};

module.exports = mongoose.model('user', userSchema);