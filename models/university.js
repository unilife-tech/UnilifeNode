var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var universitychema = new Schema({
    
   
    university_name: {
      type: String,
      required: false
    },
    university_id: {
      type: String,
      required: true
    },
    domain: {
      type: String,
      required: false
    },


  }, { collection: 'university_tbl' });
  
  module.exports = mongoose.model('University', universitychema);
  