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
    required: false
  },
  languagesSpoken:[{ 
    type: String,
    required: false
  }],

  languagesLearn:[{ 
    type: String,
    required: false
  }],
  education:{ 
    type: String,
    required: false
  },
  skills: [{ 
    type: String,
    required: false
  }],
  picture: { 
    type: String,
    required: false
  },
  about:{ 
    type: String,
    required: false
  },
  interests: [{ 
    type: String,
    required: false
  }],
  age: { 
    type: Number,
    required: false
  }

});

const User = mongoose.model('User', userSchema);
module.exports = User;
