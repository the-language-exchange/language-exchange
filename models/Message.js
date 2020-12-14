const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  receiver : { 
    type: ObjectId, 
    ref: 'User' },
  sender: { 
    type: ObjectId, 
    ref: 'User' },
  message: [{ 
    type : ObjectId, 
    ref: 'User', 
    date: new Date (),
    content: String,
  }]
});


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;

