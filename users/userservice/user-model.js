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
    gamesPlayed:{ //Añadido para guardar las partidas en la bbdd
      type: Number,
    },
    rigthAnswers:{
      type:Number,
    },
    wrongAnswers:{
      type:Number,
    },
    
});

const User = mongoose.model('User', userSchema);

module.exports = User