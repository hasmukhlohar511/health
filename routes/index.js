const routeList = require('./routeList');
const httpStatus = require('http-status');

const handleValidation = require("../express-validation")
// Dictionary of error messages for different languages
const messages = {
    en: {
        success: {
            otpSent: 'OTP sent successfully',
            otpVerified: 'OTP verified successfully',
            masterProfileNotExistsForMobileNumber: 'Master profile not exists with provided mobile number',
            masterProfileNotExistsForEmail: 'Master profile not exists with provided email',
            EmailOrMobileRequired: "At least one of the fields, either mobile number or email, is required.",
            InvalidOtp: "Invalid otp",
            otpExpired: "OTP is expired",
            invalidToken : "Token is not valid",
            tokenGenerated : "Token generated successfully",
            dataInsert: "Data Inserted successfully",
            dataFound: "Data Retrieved Successfully",
            dataUpdated: "Data Updated Successfully",
            dataNotFound: "Data not exists",
            dataDeleted: "Data Deleted Successfully",
            dataUpdate: "Data Updated Successfully",
            fileUploaded : "File Uploaded Successfully",
            fileFound : "File Founded Successfully",
            masterProfileExists : "Master Profile already exists",
            userExists : "User already exists with provided information",
            familyMemberExists : "Family member already exists with provided information",
            logout : "User Logout Successfully",
            // Add more success messages here
        },
        error: {
            invalidRouteName: 'Invalid route name',
            routeNotFound: 'Route not found in route list',
            internalServer: 'Internal server error',
            routeFunctionNotFound: 'Route function not found',
        }
    },
    hi: {
        success: {
            otpSent: 'ओटीपी सफलतापूर्वक भेजा गया',
            // Add more success messages here
        },
        error: {
            invalidRouteName: 'हेडर में अमान्य रूट नाम',
            routeNotFound: 'रूट सूची में रूट नहीं मिला',
            routeFunctionNotFound: 'रूट फ़ंक्शन नहीं मिला'
        }
    }
    // Add more languages and their corresponding messages here
};

// Function to get message based on language and type
function getMessage(language, type, code) {
    return messages[language] && messages[language][type] && messages[language][type][code] ? messages[language][type][code] : 'Unknown message';
}

function validateRoute(route) {
    return routeList.hasOwnProperty(route); // Check if the route exists in the route list
}

function getModuleAndFunction(routeName) {
    return routeList[routeName];
}

async function routeHandler(req, res, next) {
    const routeName = req.body["routeName"]
    try {
        // Step 1: Validate the Route
        //    - Check if the provided route is valid.
        if (!routeName || typeof routeName !== 'string' || !validateRoute(routeName)) {
            return res.status(httpStatus.BAD_REQUEST).send(getMessage('en', 'error', 'invalidRouteName'));
        }

        // Step 2: Retrieve Module 
        //    - If the route is valid:
        //      - Find out the module name associated with it.
        const { moduleName, functionName } = getModuleAndFunction(routeName);

        // Step 3: Express Validation
        //    - Validate the incoming request using Express middleware.
        const validationResponse = await handleValidation(req, res, next, moduleName);
        if (!validationResponse['status']) {
            return res.status(httpStatus.OK).send(validationResponse);
            // return res.status(validationResponse['code']).send(validationResponse);
        }

        // Step 4: Create Express Callback
        //    - Build an Express callback function to handle requests and responses.
        //    - Inside the callback, call the relevant function from the corresponding controller module.
        let controller;


        controller = require(`../controllers/${moduleName}Controller`);

        if (controller && typeof controller[functionName] === 'function') {

            controller[functionName](req, res, (err, data, message, statusCode, status) => {
                
                if (err) {

                    console.log("inside error", err)

                    const errorMessage = getMessage(req.headers.language || 'en', 'error', 'internalServer');
                    res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR).send({
                        message: errorMessage,
                        data,
                        status: typeof status == 'undefined' ? false : status,
                        code: statusCode || httpStatus.INTERNAL_SERVER_ERROR
                    });
                } else {

                    console.log("inside success", data)

                    const successMessage = getMessage(req.headers.language || 'en', 'success', message);
                    res.status(httpStatus.OK).send({
                    // res.status(statusCode || httpStatus.OK).send({
                        message: successMessage,
                        data,
                        status: typeof status == 'undefined' ? true : status,
                        code: statusCode || httpStatus.OK
                    });
                }
            });
        } else {
            console.log("Error inside index file of routes: route Function Not Found")
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(getMessage('en', 'error', 'internalServer'));
        }
    } catch (error) {
        console.log("Error inside index file of routes: ", error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(getMessage('en', 'error', 'internalServer'));
    }
}

module.exports = routeHandler;
