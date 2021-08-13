var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var faqsSchema = new Schema({
    
    
    questions : {
        type : String,
        required : true

    },
    answer : {
        type : String,
        required : true
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
    
    }, { collection: 'faqs' });
    
module.exports = mongoose.model('Faqs', faqsSchema);
  