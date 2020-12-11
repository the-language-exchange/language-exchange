const express = require('express');
const router  = express.Router();
const Message = require('../models/Message');

// get all messages 
router.get('/messages', (req, res, next) =>{
  Message.find()
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
        if (!user) {
          console.log('no message');
          res.status(404).json(messages);
        } else {
          res.status(200).json(messages);
        }
      })
      .catch(err => {
        res.json(err);
      })
  });
  
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
