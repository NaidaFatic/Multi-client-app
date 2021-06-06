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
    user.date_of_start = req.body.date_of_start;
    user.description = req.body.description;
    user.saved_posts = req.body.saved_posts;
    user.password = req.body.password;
//Save and check error
    user.save(function (err) {
        if (err)
            res.json(err);
res.json({
            message: "New User Added!",
            data: user
        });
    });
};
// View User
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) { //mby
        if (err)
            res.send(err);
        res.json({
            message: 'User Details',
            data: user
        });
    });
};

exports.login = function (req, res) {
    var username = req.body.email;
    var password = req.body.password;
    console.log(req.body);
};
