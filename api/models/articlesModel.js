var mongoose = require('mongoose');
//schema
var articleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    date_of_post: {
        type: Date,
        required: true,
        default:Date.now
    }
});

var Article = module.exports = mongoose.model('article', articleSchema);
module.exports.get = function (callback, limit) {
   Article.find(callback).limit(limit);
}
