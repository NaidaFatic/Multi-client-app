User = require('../models/userModel');
var jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const key = process.env.JWT_TOKEN;
const hash_token = 5;
//get all users
exports.getAll = function (req, res) {
  User.get(function (err, user) {
    if (err)
    res.json({
      status: "error",
      message: err
    });
    res.json({
      status: "success",
      data: user
    });
  });
};
//For creating new user
exports.register = function (req, res) {
  var user = new User();
  user.name = req.body.name;
  user.surname = req.body.surname;
  user.phone = req.body.phone;
  user.email = req.body.email;
  user.company_name = req.body.company_name;
  user.company_email = req.body.company_email;
  user.description = req.body.description;
  user.saved_posts = req.body.saved_posts;
  bcrypt.hash(req.body.password, hash_token, (err, hash) => {
     if(err) return cb(err)
     else user.password = hash;
  });
//Save and check error
authenticateEmail(req.body.email, function(err, user1){
  if (user1) {
    res.json({
      message: 'User with same email already exists!'
    });
  }
  else {
    user.save(function (err) {
      if (err)
      res.json({
        status: "error",
        message: err
      });
      var user_token = encodeJWT(user);
      res.json({
        token:user_token,
        //token_content:decodeJWT(user_token)
      });
    });
  }});
};
// get user
exports.getUser = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err)
    res.json(err);
    res.json({
      data: user
    });
  });
};
// login
exports.login = function(req, res){
  authenticate(req.body.email, req.body.password, function(err, user){
    if (user) {
      var user_token = encodeJWT(user);
      res.json({
        token:user_token,
        //token_content:decodeJWT(user_token)
      });
    } else {
      res.json({
       "error" : "Email or password not correct"
       });
    }
    });
};
//For login
function authenticate(email, pass, fn) {
  User.findOne ({email: email}, function(err, user) {
    if (!user) return fn(new Error('cannot find user'));
    bcrypt.compare(pass, user.password, function (err, isMatch) {
       if (err) return fn(new Error('invalid password'));
       return fn(null, user);
     });
  })
}
//for registration
function authenticateEmail(email, fn) {
  User.findOne ({email: email}, function(err, user) {
    if (user) return fn(null, user);
    fn(new Error('found email'));
  })
}
//create jwt
function encodeJWT(user){
  return jwt.sign({
    uid:user._id,
    email:user.email,
    exp:Math.floor(Date.now() / 10) + (6000 * 60)
  },key)
}
//decode jwt
function decodeJWT(token){
  return jwt.verify(token, key);
}
