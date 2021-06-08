User = require('../models/userModel');
//For index
exports.index = function (req, res) {
    User.get(function (err, user) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got User Successfully!",
            data: user
        });
    });
};
//For creating new user
exports.add = function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.company_name = req.body.company_name;
    user.company_email = req.body.company_email;
    user.description = req.body.description;
    user.saved_posts = req.body.saved_posts;
    user.password = req.body.password;
//Save and check error
authenticateEmail(req.body.email, function(err, user1){
  if (user1) {
    res.json({
        message: 'User with same email already exists!'
    });
  } else {
      user.save(function (err) {
          if (err)
              res.json(err);
          res.json({
              message: "New User Added!",
              data: user
          });
      });
    }
  });
};
// View User
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) { 
        if (err)
            res.send(err);
        res.json({
            message: 'User Details',
            data: user
        });
    });
};

//for login
function authenticate(email, pass, fn) {
  User.findOne ({email: email}, function(err, user) {
    if (!user) return fn(new Error('cannot find user'));
      if (pass == user.password) return fn(null, user);
      fn(new Error('invalid password'));
  })
}

//for registration
function authenticateEmail(email, fn) {
  User.findOne ({email: email}, function(err, user) {
    if (user) return fn(null, user);
      fn(new Error('invalid password'));
  })
}

exports.login = function(req, res){
  authenticate(req.body.email, req.body.password, function(err, user){
    if (user) {
      res.json({
          message: 'User Details',
          data: user
      });
    } else {
      res.json({
          message: 'Wrong password or email!'
      });
    }
  });
};
