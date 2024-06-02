
const { COUNTRY_CODE_CONSTANT } = require("../../utils/constants");

module.exports = function (routeName, userLanguage, check, messages) {

    const isValidOtp = (value) => {
        // Example: OTP should be exactly 6 digits
        return /^\d{6}$/.test(value);
    };

    function isNumeric(value) {
        return typeof value == "number" ? true : false
    }

    switch (routeName) {
        case 'sendOtp':
            return [
                check("email").optional().isEmail().withMessage(messages[userLanguage].errorMessages.invalidEmail),
                check("countryCode").optional().isIn(COUNTRY_CODE_CONSTANT).withMessage(messages[userLanguage].errorMessages.invalidCountryCode),
                check("mobileNumber").optional().isMobilePhone().withMessage(messages[userLanguage].errorMessages.invalidMobileNumber)
                .custom((value, { req }) => {
                    const countryCode = req.body.countryCode;
        
                    // If mobileNumber is provided, ensure countryCode is also provided
                    if (value && !countryCode) {
                        throw new Error(messages[userLanguage].errorMessages.missingCountryCode);
                    }
        
                    return true; // Indicates the validation passed
                })
            ];

        case 'verifyOtp':
            return [
                check("email").optional().isEmail().withMessage(messages[userLanguage].errorMessages.invalidEmail),
                check("countryCode").optional().isIn(COUNTRY_CODE_CONSTANT).withMessage(messages[userLanguage].errorMessages.invalidCountryCode),
                check("mobileNumber").optional().isMobilePhone().withMessage(messages[userLanguage].errorMessages.invalidMobileNumber)
                .custom((value, { req }) => {
                    const countryCode = req.body.countryCode;
        
                    // If mobileNumber is provided, ensure countryCode is also provided
                    if (value && !countryCode) {
                        throw new Error(messages[userLanguage].errorMessages.missingCountryCode);
                    }
        
                    return true; // Indicates the validation passed
                }),
                check("otp").notEmpty().withMessage(messages[userLanguage].errorMessages.otpRequired)
                    .custom(isNumeric).withMessage(messages[userLanguage].errorMessages.otpNumeric)
                    .custom(isValidOtp).withMessage(messages[userLanguage].errorMessages.invalidOtp)
            ];

         case 'generateToken' : 
            return [
                check("token").notEmpty().withMessage(messages[userLanguage].errorMessages.tokenRequired)
            ]   

        default:
            return [];
    }
}
