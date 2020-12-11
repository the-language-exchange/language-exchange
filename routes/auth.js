const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { json } = require('body-parser');

router.post('/signup', (req, res, next) => {
  const { username, imageURL, password, email, country, languagesSpoken, languagesLearn, education, skills, interests, picture, about, age } = req.body;

  if (password.length < 8) {
    return res.status(400).json({ success: 'Your password must be 8 chars minimum' });
  }
  if (username === '') {
    return res.status(400).json({ success: 'Your username cannot be empty' });
  }
  // check if username exists in database -> show message
  User.findOne({ username: username })
    .then(found => {
      if (found !== null) {
        return res.status(400).json({ success: 'Your username is already taken' });
      } else {
        // hash the password, create the user and send the user to the client
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        User.create({
          username: username,
          password: hash,
          email: email,
          country: country,
          languagesSpoken: languagesSpoken, 
          languagesLearn: languagesLearn, 
          education: education, 
          skills: skills, 
          interests: interests, 
          picture: imageURL, 
          about: about, 
          age: age
        })
          .then(dbUser => {
            // login with passport:
            req.login(dbUser, err => {
              if (err) {
                return res.status(500).json({ success: 'Error while attempting to login' })
              }
              // we don't redirect to an html page anymore, we just send the user obj to the client
              return res.status(200).json(dbUser);
            });
          })
          .catch(err => {
            res.json(err);
          })
      }
    })
})

router.post('/login', (req, res) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ success: 'Error while authenticating' });
    }
    if (!user) {
      return res.status(400).json({ success: 'Wrong credentials' });
    }
    req.login(user, err => {
      if (err) {
        return res.status(500).json({ success: 'Error while attempting to login' })
      }
      return res.status(200).json(user);
    })
  })(req, res)
});

router.delete('/logout', (req, res) => {
    req.logout();
    res.json({success: 'Successfully logged out'});
})

router.get('/loggedin', (req,res) =>{
  res.json(req.user);
})

module.exports = router;