const messages = require("./validation-messages");
const { status, check, validationResult } = require('express-validator')
const httpStatus = require("http-status")

// Function to get validation rules for a specific route
function getValidationRulesForRoute(routeName, moduleName, userLanguage) {
    try {
        const validationRules = require(`./validation-rules/${moduleName}`);
        return validationRules(routeName, userLanguage, check, messages);   
    } catch (error) {
        //If the module is not found, we will pass an empty array.
        return [];
    }
}

// Function to execute validations
async function executeValidations(validationRules, req) {
    return Promise.all(validationRules.map(validation => validation.run(req)));
}

// Function to handle validation errors
function handleValidationErrors(req) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // const errorMessage = errors.array().map(error => error.msg).join(", ");
        const errorMessage = errors.array()[0].msg; // Extract error message from the first index
        return { isValid: false, errorMessage };
    }

    return { isValid: true, errorMessage: "" };
}

// Middleware function to handle validation
const handleValidation = async (req, res, next, moduleName) => {

    const { headers: { "accept-language": userLanguage = "en" }, body: { routeName } } = req;

    // Get validation rules according to the routeName
    const validationRules = getValidationRulesForRoute(routeName, moduleName, userLanguage);

    // Execute the validation rules
    await executeValidations(validationRules, req);

    // Handle errors and return the error message
    const { isValid, errorMessage } = handleValidationErrors(req);

    console.log("\nExpress validation status : ",isValid, errorMessage)

    if (!isValid) {
        return {
            message : errorMessage,
            data: null,
            status :  false,
            code : httpStatus.BAD_REQUEST
        };
    } else {
        return {
            message : null,
            data: null,
            status :  true,
            code : httpStatus.OK
        };
    }

};

module.exports = handleValidation;