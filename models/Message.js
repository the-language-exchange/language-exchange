const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  receiver : { 
    type: Schema.ObjectId, 
    ref: 'User' },
  sender: { 
    type: Schema.ObjectId, 
    ref: 'User' },
  message: [{ 
    type : Schema.ObjectId, 
    ref: 'User', 
    date: new Date (),
    content: String,
  }]
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;

