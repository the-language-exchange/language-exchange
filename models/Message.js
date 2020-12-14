const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  receiver : { 
    type: String, 
    ref: 'User' },
  content: String,
  timestamp: Date,
  sender: { 
    type: String, 
    ref: 'User' },
  reply: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' }
});


const Message = mongoose.model('Message', userSchema);
module.exports = Message;

