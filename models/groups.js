var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupsSchema = new Schema({
    
    group_name : {
        type: String,
        required : true
    },
    created_by: {
        type: String,
        required: true
    },
    university_group_id : {
        type : String,
        required : false

    },
    group_image : {
        type : String,
        required : false

    },
    status : {
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
    
    }, { collection: 'groups' });
    
module.exports = mongoose.model('Groups', groupsSchema);
  