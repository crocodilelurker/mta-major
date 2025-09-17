const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {type:String, required : true},
    seller: {type : mongoose.Types.ObjectId , ref: 'Seller', required :true},
    price:{type:Number, required: true},
    description : {type:String, required:true},
    rating : {type :Number , required :true , default :5},
    images : [
        {type: String , required :true}
    ],
    tenantId : {
        type: mongoose.Types.ObjectId , ref:'Tenant', required:true
    }

},{
    timestamps:true
});

const Item = mongoose.model('Item',itemSchema);

module.exports= Item