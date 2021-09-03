var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blog_likesSchema = new Schema({
    
    
    user_id : {
        type : String,
        required : true

    },
    blog_id : {
        type : String,
        required : true
       

    },
    created_at : {
        type : String,
        required : false

    },
    updated_at : {
        type : String,
        required : false

    }
    
    }, { collection: 'blog_likes' });
    
module.exports = mongoose.model('Blog_likes', blog_likesSchema);
  