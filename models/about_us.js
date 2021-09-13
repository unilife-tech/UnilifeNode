var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aboutSchema = new Schema({
    
   
    about_us: {
      type: String,
      required: true
    },    
    
   created_at: {
      type: String,
      required: false
      
    },
    updated_at: {
      type: String,
      required: false
    }

  }, { collection: 'about_us' });
  
  module.exports = mongoose.model('About', aboutSchema);
  
