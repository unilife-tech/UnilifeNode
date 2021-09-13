var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment_repliesSchema = new Schema({
    
    
    user_id : {
        type : String,
        required : true
    },
    comment_id : {
        type : String,
        required : true
    },
    
    reply : {
        type : String,
        required : false
    },
    created_at : {
        type : String,
        required : false
    },
    updated_at : {
        type : String,
        required : false
    }
    
    }, { collection: 'comment_replies' });
    
module.exports = mongoose.model('Comment_replies',Comment_repliesSchema);
  