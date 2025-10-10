const otpGenerator = require('../utils/otpGenerator.js')
const response = require('../utils/responseHandler.js')
const Client = require('../models/clientModel.js')
const Seller = require('../models/sellerModel.js')
const sendOtpToEmail = require('../services/emailService.js')

const sendOtp = async (req, res) => {
    const otp = otpGenerator();
    const { email, typeOfClient } = req.body;
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    try {
        if (email && typeOfClient) {
            let user;
            if (typeOfClient == 'client') {
                user = await Client.findOne({ email });
                if (!user) {
                    user = new Client({ email });
                }
                user.otp = otp;
                user.otpExpiry = expiry;
                await sendOtpToEmail(email, otp);
                console.log("OTP sent");
                await user.save();
                return response(res, 200, "OTP sent to email success");
            }
            else if (typeOfClient == 'seller') {
                user = await Seller.findOne({ email });
                if (!user) {
                    user = new Seller({ email });
                }
                user.otp = otp;
                user.otpExpiry = expiry;

                await sendOtpToEmail(email, otp);
                console.log("OTP sent");
                await user.save();
                return response(res, 200, "OTP sent to email success");
            }
            else {
                console.error("Invalid Type of Client for Login Specify type of client as 'seller' or 'client'")
                return response(res, 400, "Bad Request")
            }

        }
        else {
            return response(res, 400, "Unfilled data")
        }
    }
    catch (error) {
        console.error(error);
        return response(res, 500, "Internal Server Error")
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp, typeOfClient } = req.body;
        if (email && otp && typeOfClient) {
            let user;
            if (typeOfClient == 'client') {
                user = await Client.findOne({ email });
                if (!user) {
                    return response(res, 404, "User not found");
                }
                const now = new Date();
                if (!(user.emailOtp) || (user.emailOtp !== String(otp)) || (now > user.emailOtpExpire)) {
                    return response(res, 404, "Invalid OTP Verification Step Maybe Missing OTP or Expired");
                }
                user.isVerified = true;
                user.emailOtp = null;
                user.emailOtpExpire = null;
                await user.save();
                //token creation logic here
            }
            else if (typeOfClient == 'seller') {

            }
            else {
                console.error("No Data");
                return response(res, 400, "Require TypeOf Client as 'seller' or 'client'");
            }
        }
        else {
            return response(res, 400, "Unfilled data")
        }
    }

    catch (error) {
        console.error(error);
        return response(res, 500, "Internal Server Error");
    }
}
module.exports = { sendOtp, verifyOtp };