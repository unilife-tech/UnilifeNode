var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var discount_couponsSchema = new Schema({
    
    
    categories_id : {
        type : String,
        required : true

    },
    brand_id : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : false
    },
    start_date : {
        type : String,
        required : true
    },
    exp_date : {
        type : String,
        required : false
    },
    type : {
        type : String,
        required : false
    },
    discount_type : {
        type : String,
        required : false
    },
    discount_amount : {
        type : String,
        required : false
    },
    discount_code : {
        type : String,
        required : false
    },
    term_condition : {
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
    
    }, { collection: 'discount_coupons' });
    
module.exports = mongoose.model('Discount_coupons', discount_couponsSchema);
  