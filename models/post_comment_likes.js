var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post_comment_likesSchema = new Schema({
    
    
    user_id : {
        type : String,
        required : true
    },
    post_comment_id : {
        type : String,
        required : true
    },
    
    type : {
        type : String,
        required : true,
        default : "P"
    },
    created_at : {
        type : String,
        required : false
    },
    updated_at : {
        type : String,
        required : false
    }
    
    }, { collection: 'post_comment_likes' });
    
module.exports = mongoose.model('Post_comment_likes',post_comment_likesSchema);
  