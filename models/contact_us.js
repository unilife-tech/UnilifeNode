var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contact_usSchema = new Schema({
    
    
    type_of_concern : {
        type : String,
        required : true

    },
    description : {
        type : String,
        required : false
    },
    user_id : {
        type : String,
        required : true
    },
    post_id : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : false
    },
    subject : {
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
    
    }, { collection: 'contact_us' });
    
module.exports = mongoose.model('Contact_us',contact_usSchema);
  