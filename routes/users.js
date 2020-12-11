const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const uploader = require('../configs/cloudinary.js');

// get all users 
router.get('/', (req, res, next) =>{
  User.find()
  .then(users => {
    res.status(200).json(users);
    })
    .catch(err => {
      res.json(err);
    })
  })

// get a specfic user
  router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
      .then(user => {
        if (!user) {
          console.log('no user');
          res.status(404).json(user);
        } else {
          res.status(200).json(user);
        }
      })
      .catch(err => {
        res.json(err);
      })
  });
  
//update users
router.put('/:id', (req, res, next) => {
  const { username, email } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { username, email },
    // this ensures that we are getting the updated document as a return 
    { new: true }
  )
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(err => {
      res.json(err);
    })
});

///delete user
router.delete('/:id', (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      res.status(200).json({ success: 'ok' })
    })
    .catch(err => {
      res.json(err);
    })
});


//route for profile pictures
router.post('/edit/:id', uploader.single('picture'), (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  
});

module.exports = router;
