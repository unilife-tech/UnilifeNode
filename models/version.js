var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var versionSchema = new Schema({
    
    android : {
        type: String,
        required : true
    },
    
    ios : {
        type : String,
        required : true

    }
    }, { collection: 'version' });
    
module.exports = mongoose.model('Version', versionSchema);
  