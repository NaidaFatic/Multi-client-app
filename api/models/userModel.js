var mongoose = require('mongoose');
//schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'USER'
    },
    company_name: {
          type: String,
          required: true
    },
    company_email: {
        type: String,
        required: true
    },

    date_of_start: {
        type: Date,
        default:Date.now
    },
    description: {
        type: String,
        required: true
    },
    saved_posts: {
        type: Array
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.query.byEmail= function(email) {
   return this.where({ email: new RegExp(email, 'i') })
 };

var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
   User.find(callback).limit(limit);
}
