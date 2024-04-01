const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, 
    },
    gamesPlayed:{ 
      type: Number,
      default:0,
    },
    rigthAnswers:{
      type:Number,
      default:0,
    },
    wrongAnswers:{
      type:Number,
      default:0,
    },
    
});

const User = mongoose.model('User', userSchema);

module.exports = User