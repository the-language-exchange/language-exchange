const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  receiver : { 
    type: String, 
    ref: 'User' },
  content: String,
  date: new Date (),
  sender: { 
    type: String, 
    ref: 'User' },
  reply: [{ 
    type : ObjectId, 
    ref: 'User', 
    content: String,
    date: new Date ()
  }]
});


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;

