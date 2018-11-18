const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const tooShort = {message: "USERNAME PASSWORD TOO SHORT"};
const alreadyExist = {message: "USERNAME ALREADY EXISTS"};
const saveError = {message: "DOCUMENT SAVE ERROR"};
const noUser = {message: "USER NOT FOUND"};
const wrongPW = {message: "PASSWORDS DO NOT MATCH"};

function register(username, email, password, errorCallback, successCallback) {
  if(username.length >= 8 && password.length >= 8){
    User.findOne({username: username}, (err, result, count) => {
      if(result){
        errorCallback(alreadyExist);
      } else {
        bcrypt.hash(password, 10, function(err, hash) {
          new User({
            username: username,
            email: email,
            password: hash,
          }).save((err, res) => {
            if(err) {
              console.log(err);
              errorCallback(saveError);
            } else {
              successCallback(res);
            }
          });
        });
      }
    });
  } else {
    errorCallback(tooShort);
  }
}

function login(username, password, errorCallback, successCallback) {
  User.findOne({username: username}, (err, user, count) => {
    if(!err && user) {
      bcrypt.hash(password, 10, function(err, hash) {
        bcrypt.compare(password, user.password, function(err, res) {
          if(res === true) {
            successCallback(user);
          } else {
            console.log(err);
            errorCallback(wrongPW);
          }
        })
      });
    } else {
      console.log(err);
      errorCallback(noUser);
    }
  });
}

function startAuthenticatedSession(req, user, cb) {
  req.session.regenerate(function(err) {
    if(!err){
      req.session.user = user;
      cb(err);
    } else {
      console.log(err);
    }
  });
}

module.exports = {
  startAuthenticatedSession: startAuthenticatedSession,
  register: register,
  login: login
};
