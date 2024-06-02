module.exports = function (routeName, userLanguage, check, messages) {

    switch (routeName) {
        case 'createFingerprint':
            return [
                check("userAgent")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.userAgentRequired)
                    .isString().withMessage(messages[userLanguage].errorMessages.invalidUserAgent),

                check("ipAddress")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.ipAddressRequired)
                    .isIP().withMessage(messages[userLanguage].errorMessages.invalidIpAddress),

                check("verificationEmail")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.verificationEmailRequired)
                    .isEmail().withMessage(messages[userLanguage].errorMessages.invalidVerificationEmail),

                check("timestamps")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.timestampsRequired),

                check("ticketId")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.ticketIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.ticketIdMongoId)

            ];

        case 'getFingerprint':
            return [
                check("ticketId")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.ticketIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.ticketIdMongoId)
            ];

        default:
            return [];
    }
};
