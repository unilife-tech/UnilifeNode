<<<<<<< HEAD
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_social_profileSchema = new Schema({
    
    user_id : {
        type: String,
        required : true
    },
    facebook: {
        type: String,
        required: false
    },
    instagram : {
        type : String,
        required : false

    },
    snapchat : {
        type : String,
        required : false
        

    },
    twitter : {
        type : String,
        required : false
       

    },
    linkedIn : {
        type : String,
        required : false
       

    },
    created_at : {
        type : String,
        required : false

    }
    
    }, { collection: 'user_social_profile' });
    
module.exports = mongoose.model('User_social_profile', user_social_profileSchema);
=======
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_social_profileSchema = new Schema({
    
    user_id : {
        type: String,
        required : true
    },
    facebook: {
        type: String,
        required: false
    },
    instagram : {
        type : String,
        required : false

    },
    snapchat : {
        type : String,
        required : false
        

    },
    twitter : {
        type : String,
        required : false
       

    },
    linkedIn : {
        type : String,
        required : false
       

    },
    created_at : {
        type : String,
        required : false

    }
    
    }, { collection: 'user_social_profile' });
    
module.exports = mongoose.model('User_social_profile', user_social_profileSchema);
>>>>>>> 5f8eddb822302c32a8fe780ee475d117b7c87718
  