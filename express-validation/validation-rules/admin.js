const { COUNTRY_CODE_CONSTANT } = require("../../utils/constants");

module.exports = function (routeName, userLanguage, check, messages) {

    switch (routeName) {
        case 'createAdmin':
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

        case 'updateAdmin':
            return [
                check("firstName")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.firstNameRequired),

                check("lastName")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.lastNameRequired),

                check("dateOfBirth")
                    .optional()
                    .isISO8601().withMessage(messages[userLanguage].errorMessages.invalidDateOfBirth),

                check('adminId')
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.adminIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.adminIdMongoId),
            ];

        default:
            return [];
    }
};