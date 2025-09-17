const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    name: { type: String, required: true, trim:true },
    slug : {type:String, required:true, trim :true, lowercase:true, unique:true},
    description: { type: String, required: true },
    image: { type: String },
}, {
    timestamps: true
});

const Tenant = mongoose.model('Tenant', tenantSchema);
module.exports = Tenant;