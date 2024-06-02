const { COUNTRY_CODE_CONSTANT, COMMUNICATION_EMAIL_TYPE } = require("../../utils/constants");

module.exports = function (routeName, userLanguage, check, messages) {

    switch (routeName) {
        case 'createPatient':
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

                check("businessEmail")
                    .optional()
                    .isEmail().withMessage(messages[userLanguage].errorMessages.invalidBusinessEmail),

                check("personalEmail")
                    .optional()
                    .isEmail().withMessage(messages[userLanguage].errorMessages.invalidPersonalEmail),

                check("communicationEmail")
                    .isIn(COMMUNICATION_EMAIL_TYPE).withMessage(messages[userLanguage].errorMessages.invalidCommunicationEmail),

                check("dateOfBirth")
                    .optional()
                    .isISO8601().withMessage(messages[userLanguage].errorMessages.invalidDateOfBirth),

                check("employerId")
                    .optional()
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.employerIdMongoId),

                check("insuranceProvider")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.insuranceProviderRequired),

                check("primaryProviderName")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.primaryProviderNameRequired),

                check("groupId")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.groupIdRequired),

            ];

        case 'updatePatient':
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

                check("businessEmail")
                    .optional()
                    .isEmail().withMessage(messages[userLanguage].errorMessages.invalidBusinessEmail),

                check("personalEmail")
                    .optional()
                    .isEmail().withMessage(messages[userLanguage].errorMessages.invalidPersonalEmail),

                check("communicationEmail")
                    .isIn(COMMUNICATION_EMAIL_TYPE).withMessage(messages[userLanguage].errorMessages.invalidCommunicationEmail),

                check("dateOfBirth")
                    .optional()
                    .isISO8601().withMessage(messages[userLanguage].errorMessages.invalidDateOfBirth),

                check("employerId")
                    .optional()
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.employerIdMongoId),

                check("insuranceProvider")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.insuranceProviderRequired),

                check("primaryProviderName")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.primaryProviderNameRequired),

                check("groupId")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.groupIdRequired),

            ];

        case 'getPatient':
                return [
                    check("patientId")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.patientIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.patientIdMongoId),
            ];

        case 'deletePatient':
                return [
                    check("patientId")
                    .notEmpty().withMessage(messages[userLanguage].errorMessages.patientIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.patientIdMongoId),
                ];
        default:
            return [];
    }
};
