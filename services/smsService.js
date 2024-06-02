const axios = require('axios');
const twilio = require("twilio");
const MailService = require("../services/mailService");

const sendOtpToMobile = async (mobileNumber, otp, message) => {
  try {
    const client = twilio(process.env.TWILIO_ACCOUNTSID, process.env.TWILIO_AUTHTOKEN);
    var args = {
      from: process.env.TWILIO_FROM,
      to: `${mobileNumber}`,
      body: message,
    };

    const res = await client.messages.create(args);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {sendOtpToMobile};
