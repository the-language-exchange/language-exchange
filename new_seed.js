/* mySeedScript.js */
// require the necessary libraries
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const _ = require("lodash");
const interestList = require('./interests')
const langList = require('./LanguageNode')
const countryList = require('./CountryNode')
// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "language-exchange";

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);

  const db = client.db(dbName);
  
  // get access to the relevant collections
  const usersCollection = db.collection("users");
  //const postsCollection = db.collection("posts");
  // make a bunch of users
  let users = [];
  for (let i = 0; i < 100; i += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const about = faker.lorem.words(500);
    const userName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
    const age = Math.floor(Math.random() * (99 - 18 + 1) + 18);
    const skills = _.sampleSize(interestList, _.random(1,6))
    const interests = _.sampleSize(interestList, _.random(1,6))
    const languagesLearn = _.sampleSize(langList, _.random(1,6))
    const languagesSpoken = _.sampleSize(langList, _.random(1,4))
    const country = _.sample(countryList)
    const education = _.sample(["Master/PhD","Bachelor", "High school", "Less than high school"])
    const picture = "http://rndimg.com/ImageStore/OilPaintingOrange/300x300_OilPaintingOrange_6dd968db0cc849988783b6731e765dac.jpg"
    let newUser = {
      username:userName,
      email: faker.internet.email(firstName, lastName),
      password: "password123",
      about,
      age,
      skills,
      interests,
      languagesLearn,
      languagesSpoken,
      country,
      education,
      picture
    };
    users.push(newUser);

    // visual feedback always feels nice!
    //console.log(newUser.email);
  }
  usersCollection.insertMany(users);

  // make a bunch of posts
  /*let posts = [];
  for (let i = 0; i < 5000; i += 1) {
    let newPost = {
      title: faker.lorem.words(7),
      body: faker.lorem.words(500),

      // use lodash to pick a random user as the author of this post
      author: _.sample(users),

      // use lodash to add a random subset of the users to this post
      likes: _.sampleSize(users, Math.round(Math.random * users.length)).map(
        user => user._id
      )
    };
    posts.push(newPost);

    // visual feedback again!
    console.log(newPost.title);
  }
  postsCollection.insertMany(posts);*/
  console.log("Database seeded! :)")
  client.close();
});
