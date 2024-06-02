const jwtService = require("../services/jwtService");
const MasterProfileService = require("../services/database/masterProfileService");
const PatientService = require("../services/database/patientService");
const adminService = require("../services/database/adminService");

const { sanitizeMasterProfileData } = require("../utils/sanitize");
const { generateOtp, generateOtpExpiry, convertUTCDateToYYYYMMDD } = require("../utils/common");
const { sendOtpToMobile } = require("../services/smsService");
const { sendOtpToEmail } = require("../services/mailService");

// Secret key for JWT signing and verification
const TEMP_TOKEN_SECRET_KEY = process.env.JWT_SECRET || 'your_default_secret_key';
const ACCESS_TOKEN_SECRET_KEY = process.env.JWT_SECRET
const ONE_HOUR_EXPIRY = '1h'
const JWT_MALFORMED_ERROR_1 = "JsonWebTokenError: jwt malformed"
const JWT_MALFORMED_ERROR_2 = "JsonWebTokenError: invalid signature"
const JWT_MALFORMED_ERROR_3 = "TokenExpiredError: jwt expired"
const JWT_MALFORMED_ERROR_4 = "JsonWebTokenError: jwt must be provided"
const JWT_MALFORMED_ERROR_5 = "JsonWebTokenError: invalid token"

async function getUserByRole(role, masterProfileId) {
    try {
        let userData = {};

        switch (role) {
            case 'PA':

                const patientData = await PatientService.findOne({ masterProfileId: masterProfileId }, {
                    firstName:1, lastName:1, mobileNumber: 1, countryCode: 1, dateOfBirth: 1, primaryProviderName: 1, insuranceProvider: 1, groupId: 1,businessEmail:1, personalEmail:1, communicationEmail:1, createdAt:1, profileImage:1,plan:1
                })
                
                userData = { ...patientData._doc }

                console.log("patientData",patientData)
                userData['email'] = userData.communicationEmail == "BS" ? userData.businessEmail : userData.personalEmail
                userData['name'] = userData.firstName + " " + userData.lastName
                userData['role'] = "PA"
                userData['createdAt'] = convertUTCDateToYYYYMMDD(userData.createdAt)

                delete userData['firstName'];
                delete userData['lastName'];
                delete userData['personalEmail'];
                delete userData['businessEmail'];
                delete userData['communicationEmail'];

                break;

            case 'AD':

                const adminData = await adminService.findOne({ masterProfileId: masterProfileId }, {
                    mobileNumber: 1, countryCode: 1, dateOfBirth: 1, email:1, firstName:1, lastName:1, masterProfileId: 1
                })

                userData = { ...adminData._doc }

                userData['name'] = userData.firstName + " " + userData.lastName
                userData['role'] = "AD"

                delete userData['firstName'];
                delete userData['lastName'];

                break;

            default:
                break;
        }

        return userData;
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
    sendOtp: async (req, res, callback) => {
        // Simulate sending OTP process
        let { email, mobileNumber, countryCode } = req.body;
        try {
            if (!email && !mobileNumber) {
                return callback(null, null, 'EmailOrMobileRequired', 400, false);
            }

            let masterProfileQuery = {}
            if (mobileNumber) {
                masterProfileQuery = { mobileNumber, countryCode }
                // check existence of master profile
                const isMasterProfileExists = await MasterProfileService.checkExistence(masterProfileQuery)
                if (!isMasterProfileExists) {
                    return callback(null, null, 'masterProfileNotExistsForMobileNumber', 404, false);
                }
            } else if (email) {
                masterProfileQuery = { email }
                // check existence of master profile
                const isMasterProfileExists = await MasterProfileService.checkExistence(masterProfileQuery)
                if (!isMasterProfileExists) {
                    return callback(null, null, 'masterProfileNotExistsForEmail', 404, false);
                }
            }

            // generate otp and send to user via message or email along with otp updation in master profile collection
            if (process.env.ENVIRONMENT === "live") {
                const otp = generateOtp();
                const expiresAt = generateOtpExpiry();

                if (email) {
                    // Update otp in master profile
                    await MasterProfileService.findByQueryAndUpdate({ email }, { otp, otpExpiresAt: expiresAt });

                    // Send OTP to email
                    await sendOtpToEmail(email, otp);
                } else if (mobileNumber) {
                    const message = `HealthOptions One Time Password (OTP) is ${otp} -HealthOptions`;

                    // Update otp in master profile
                    await MasterProfileService.findByQueryAndUpdate({ mobileNumber, countryCode }, { otp, otpExpiresAt: expiresAt });

                    // Send OTP to mobile number
                    await sendOtpToMobile(`${countryCode}${mobileNumber}`, otp, message);
                }

            }

            callback(null, {}, 'otpSent');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    verifyOtp: async (req, res, callback) => {
        // Simulate verify OTP process
        let { email, mobileNumber, countryCode, otp } = req.body;
        try {
            if (!email && !mobileNumber) {
                return callback(null, null, 'EmailOrMobileRequired', 400, false);
            }

            let masterProfileQuery = {};
            if (mobileNumber) {
                masterProfileQuery = { mobileNumber, countryCode };
            } else if (email) {
                masterProfileQuery = { email };
            }

            // Check existence of master profile
            const masterProfile = await MasterProfileService.findOne(masterProfileQuery);

            if (!masterProfile) {
                if (mobileNumber) {
                    return callback(null, null, 'masterProfileNotExistsForMobileNumber', 404, false);
                } else if (email) {
                    return callback(null, null, 'masterProfileNotExistsForEmail', 404, false);
                }
            }

            if (process.env.MASTER_OTP != otp) {
                if (Date.now() > masterProfile.otpExpiresAt) {
                    return callback(null, null, 'otpExpired', 400, false);
                }

                // Verify OTP
                if (masterProfile.otp !== otp) {
                    return callback(null, null, 'InvalidOtp', 400, false);
                }
            }

            console.log("masterProfile",masterProfile)

            const token = await jwtService.sign({ _id: masterProfile._id, role: masterProfile.role[0] }, ONE_HOUR_EXPIRY, TEMP_TOKEN_SECRET_KEY)

            return callback(null, { token }, 'otpVerified');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    generateToken: async (req, res, callback) => {
        const { token } = req.body;
        try {
            const isTokenValid = await jwtService.verify(token, TEMP_TOKEN_SECRET_KEY);
            if (!isTokenValid) {
                return callback(null, null, 'invalidToken', 401, false);
            }

            const masterProfile = await MasterProfileService.getById(isTokenValid._id)
            const blackListedToken = masterProfile.blackListedToken;

            console.log("blackListedToken", isTokenValid)
            if (blackListedToken && blackListedToken.includes(token)) {
                return callback(null, null, 'invalidToken', 401, false);
            }

            const userData = await getUserByRole(isTokenValid.role, masterProfile._id);

            //generate jwt token of sanitize master profile 
            const accessToken = await jwtService.sign(sanitizeMasterProfileData(userData), ONE_HOUR_EXPIRY, ACCESS_TOKEN_SECRET_KEY)

            //add token into black list
            await MasterProfileService.findByQueryAndUpdateArray({ _id: masterProfile._id }, { $push: { blackListedToken: token } });

            return callback(null, { accessToken }, 'tokenGenerated');
        } catch (error) {
            console.log(error, "error")

            if (error == JWT_MALFORMED_ERROR_1 || error == JWT_MALFORMED_ERROR_2 || error == JWT_MALFORMED_ERROR_3 || error == JWT_MALFORMED_ERROR_4 || JWT_MALFORMED_ERROR_5) {
                return callback(null, null, 'invalidToken', 401, false);
            } else {
                callback(error, null, null);
            }
        }
    },
    getUser: async (req, res, callback) => {
        const { role, masterProfileId } = req.decodedToken;
        try {
            const userData = await getUserByRole(role, masterProfileId);

            callback(null, { user: userData }, 'dataFound');
        } catch (error) {
            callback(error, null, null);
        }
    },
    logout: async (req, res, callback) => {
        const { masterProfileId } = req.decodedToken;
        const token = req.headers['authorization'];
        try {
            await MasterProfileService.findByQueryAndUpdateArray({ _id: masterProfileId }, 
                { $push: { blackListedToken: token } }
            );
            callback(null, {}, 'logout');
        } catch (error) {
            callback(error, null, null);
        }
    }
};
