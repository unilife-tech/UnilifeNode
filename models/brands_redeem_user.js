var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ruserSchema = new Schema({
    
    user_id : {
        type: String,
        required : true
    },
    brand_id: {
        type: String,
        required: true
    },
    brands_online_instore_id : {
        type : String,
        required : false

    },
    code : {
        type : String,
        required : false
        

    },
    created_date : {
        type : String,
        required : false
       

    },
    receipt_number : {
        type : String,
        required : false
       

    },
    branch_name_location : {
        type : String,
        required : false

    },
    offer_type : {
        type : String,
        required : false

    }
    
    }, { collection: 'brands_redeem_user' });
    
module.exports = mongoose.model('Redeem_user', ruserSchema);
  