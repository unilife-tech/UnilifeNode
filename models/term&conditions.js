var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var termscSchema = new Schema({
    
   
    term_condition: {
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

  }, { collection: 'term&conditions' });
  
  module.exports = mongoose.model('Terms', termscSchema);
  
