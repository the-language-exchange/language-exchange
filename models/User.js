const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { 
    type: String,
    required: true
  },
  password: { 
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: false
  },
  country: { 
    type: String,
    required: true
  },
  languagesSpoken:{ 
    type: String,
    required: true
  },
  languagesLearn: { 
    type: String,
    required: true
  },
  education:{ 
    type: String,
    required: false
  },
  skills: { 
    type: String,
    required: false
  },
  picture: { 
    type: String,
    required: false
  },
  about:{ 
    type: String,
    required: false
  },
  interests: { 
    type: String,
    required: false
  },
  age: { 
    type: Number,
    required: false
  }

});

const User = mongoose.model('User', userSchema);
module.exports = User;
