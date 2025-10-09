const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    otp: { type: String },
    otpExpiry: { type: String },
    isVerified: { type: Boolean, default: false },
})

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;
