const express = require('express');
const router  = express.Router();
const Message = require('../models/Message');

// get all messages belonging to client
router.get('/messages', (req, res, next) =>{
  Message.find({ $or: [ {receiver:req.user._id }, { sender: req.user._id } ] })
  .populate([ 'sender', 'receiver', 'message.user'])
  .then(messages => {
    modifiedMessage = messages.map(messages => ({...messages, client:req.user}))
    res.status(200).json(modifiedMessage);
    })
    .catch(err => {
      res.json(err);   
    })
  })
 
// get a specfic message
  router.get('/messages/:id', (req, res, next) => {
    Message.findById(req.params.id)
      .then(message => {
        if (!req.user) {
          console.log('no message');
          res.status(404).json(message);
        } else {
          res.status(200).json(message);
        }
      })
      .catch(err => {
        res.json(err);
      })
  });
  
  //send message to a user
  router.post('/messages/send/:id', (req, res, next) => {
    const {content, id} = req.body
    const sender = req.user._id 
    const receiver = req.params.id
    const message = {content, user:sender}
    const query = {sender, receiver}
    const update = {sender,receiver, $push:{message:{user:sender, content}} }
    const options = { upsert: true, new:true, setDefaultsOnInsert: true }
  Message.findOneAndUpdate(query, update, options)
  .then(data => res.status(200).json(data))
  .catch(err => console.log(err))

  /*Message.create({}) */
});
   
//send reply 
  router.post('/messages/reply/:id', (req,res,next) => {
    const {content, user} = req.body
    Message.findByIdAndUpdate(req.params.id,{$push:{message:{content,user}}}, {new:true})
    .then(message =>{
      console.log(message)
      res.status(200).json(message)})
    .catch(err => res.json(err))
  })

  //send client ibformation
  router.get('/client', (req,res) => {
    res.json(req.user)
  })
  

    // do something with the document


// //update users
// router.put('/:id', (req, res, next) => {
//   const {  username, password, email, country, languagesSpoken, languagesLearn, education, skills, interests, picture, about, age } = req.body;
//   User.findByIdAndUpdate(
//     req.params.id,
//     { username, password, email, country, languagesSpoken, languagesLearn, education, skills, interests, picture, about, age },
//     // this ensures that we are getting the updated document as a return 
//     { new: true }
//   )
//     .then(user => {
//       console.log(user);
//       res.status(200).json(user);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });

// ///delete user
// router.delete('/:id', (req, res, next) => {
//   User.findByIdAndDelete(req.params.id)
//     .then(user => {
//       res.status(200).json({ success: 'ok' })
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });


module.exports = router;
