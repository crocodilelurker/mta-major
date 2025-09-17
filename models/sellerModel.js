const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    name:{type:String, required:true},
    upi:{type:String, required:true},
    description:{type:String},
    idProof:{type:String, required:true},
    rating : {type : Number , default : 5},
    tenantId : {
        type : mongoose.Types.ObjectId , ref : 'Tenant',
        required:true
    }
},
{
    timestamps:true
})

const Seller = mongoose.model('Seller',sellerSchema);
module.exports = Seller