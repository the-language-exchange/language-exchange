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
    ID:{type:Schema.ObjectId, ref: 'User'},
    date:{type:Date, default:new Date().toISOString()},
    content: String,
  }]
});


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;

