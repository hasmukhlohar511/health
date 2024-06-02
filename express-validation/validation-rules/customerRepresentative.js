const { COUNTRY_CODE_CONSTANT } = require("../../utils/constants");

module.exports = function (routeName, userLanguage, check, messages) {
    switch (routeName) {
        case 'createCustomerRepresentative':
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

                check('employerId')
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.employerIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.employerIdMongoId),
            ];

        case 'updateCustomerRepresentative':
            return [
                check("firstName")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.firstNameRequired),

                check("lastName")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.lastNameRequired),

                check("dateOfBirth")
                    .optional()
                    .isISO8601().withMessage(messages[userLanguage].errorMessages.invalidDateOfBirth),

                check('employerId')
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.employerIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.employerIdMongoId),

                check('customerRepId')
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.customerRepIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.customerRepIdMongoId),
            ];

        case 'getCustomerRepresentative':
            return [
                check('customerRepId')
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.customerRepIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.customerRepIdMongoId),
            ]

        default:
            return [];
    }
};