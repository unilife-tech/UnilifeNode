var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var offersSchema = new Schema({
    
    title : {
        type: String,
        required : true
    },
    brand_id: {
        type: String,
        required: true
    },
    categories_id : {
        type : String,
        required : false

    },
    start_date : {
        type : String,
        required : false

    },
    exp_date : {
        type : String,
        required : false
        

    },
    type : {
        type : String,
        required : false,
        default : 0

    },
    link : {
        type : String,
        required : false

    },
    discount_percent : {
        type : String,
        required : false

    },
    image : {
        type : String,
        required : false

    },
    discount_type : {
        type : String,
        required : false

    },
    discount_code : {
        type : String,
        required : false

    },
    description : {
        type : String,
        required : false

    },
    term_condition : {
        type : String,
        required : false

    },
    slider : {
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
    }, { collection: 'offers' });
    
module.exports = mongoose.model('Offers', offersSchema);
  