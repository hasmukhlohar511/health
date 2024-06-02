const { COUNTRY_CODE_CONSTANT } = require("../../utils/constants");

module.exports = function (routeName, userLanguage, check, messages) {

    switch (routeName) {
        case 'createSubAdmin':
            return [
                check("firstName")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.firstNameRequired),

                check("lastName")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.lastNameRequired),

                check("mobileNumber")
                    .optional()
                    .isMobilePhone().withMessage(messages[userLanguage].errorMessages.invalidMobileNumber),

                check("countryCode")
                    .optional()
                    .isIn(COUNTRY_CODE_CONSTANT).withMessage(messages[userLanguage].errorMessages.invalidCountryCode),

                check("dateOfBirth")
                    .optional()
                    .isISO8601().withMessage(messages[userLanguage].errorMessages.invalidDateOfBirth),

                check("email")
                    .optional()
                    .isEmail().withMessage(messages[userLanguage].errorMessages.invalidEmail),


            ];

        case 'updateSubAdmin':
            return [
                check("firstName")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.firstNameRequired),

                check("lastName")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.lastNameRequired),

                check("dateOfBirth")
                    .optional()
                    .isISO8601().withMessage(messages[userLanguage].errorMessages.invalidDateOfBirth),

                check('subAdminId')
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.subAdminIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.subAdminIdMongoId),
            ];

        case 'getSubAdmin':
            return [
                check('subAdminId')
                .notEmpty().withMessage(messages[userLanguage].errorMessages.subAdminIdRequired)
                .isMongoId().withMessage(messages[userLanguage].errorMessages.subAdminIdMongoId),
            ]

        default:
            return [];
    }
};