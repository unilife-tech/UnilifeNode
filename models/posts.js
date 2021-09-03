var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postsSchema = new Schema({
    
    admin_id : {
        type: String,
        required : false,
        default : 0
    },
    user_id: {
        type: String,
        required: true
    },
    university_post_id : {
        type : String,
        required : false

    },
    caption : {
        type : String,
        required : false

    },
    location_name : {
        type : String,
        required : false
    

    },
    post_through_group : {
        type : String,
        required : false,
        default : "no"

    },
    group_id : {
        type : String,
        required : false

    },
    status : {
        type : String,
        required : false

    },
    type : {
        type : String,
        required : false

    },
    question : {
        type : String,
        required : false

    },
    event_title : {
        type : String,
        required : false

    },
    event_link : {
        type : String,
        required : false

    },
    event_description : {
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
    
    
    }, { collection: 'posts' });
    
module.exports = mongoose.model('Posts', postsSchema);
  