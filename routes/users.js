const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const { uploader } = require('../configs/cloudinary.js');

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
  const {  username, email, country, languagesSpoken, languagesLearn, education, skills, interests, picture, about, age } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { username, email, country, languagesSpoken, languagesLearn, education, skills, interests, picture, about, age },
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


//route for editing profile pictures
// router.post('/edit/:id', uploader.single('picture'), (req, res, next) => {
//   console.log(req.body);
//   console.log(req.file);
  
// });

// routes/file-upload.js
router.post('/upload', uploader.single("picture"), (req, res, next) => {
  // console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  console.log(req.file)
  // get secure_url from the file object and save it in the 
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.path });
});

module.exports = router;
