const express = require('express');
const router  = express.Router();
const Message = require('../models/Message');

// get all messages 
router.get('/messages', (req, res, next) =>{
  Message.find({ $or: [ {receiver:req.user._id }, { sender: req.user._id } ] })
  .then(messages => {
    res.status(200).json(messages);
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
  
  router.post('messages/send/:id', (req, res, next) => {
    console.log('hello')
    /*const {content, id} = req.body
    console.log("aaa")
    const sender = req.user._id 
    const receiver = req.params.id
    const query = {sender, receiver}
    const update = {sender,receiver, $push:{content} }
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }
  Message.findOneAndUpdate(query, update, options)
  .then(data => res.status(200).json(data))
  .catch(err => console.log(err))*/
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
