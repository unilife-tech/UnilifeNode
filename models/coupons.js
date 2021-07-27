var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var couponSchema = new Schema({
    
    user_id : {
        type: String,
        required : true
    },
    coupon_id: {
        type: String,
        required: true
    },
    type : {
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
    
    }, { collection: 'redeem_coupon' });
    
module.exports = mongoose.model('Coupon', couponSchema);
  