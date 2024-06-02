const { mongoose } = require('mongoose');
const hrManagerService = require('../services/database/hrManagerService');
const masterProfileService = require("../services/database/masterProfileService");
const mailService = require('../services/mailService');

module.exports = {
    createHRManager: async (req, res, callback) => {
        const {
            firstName,
            lastName,
            countryCode,
            mobileNumber,
            email,
            dateOfBirth,
            employerId
        } = req.body;

        try {
            // Your logic for creating an HR manager goes here
            const isMasterProfileExists = await masterProfileService.checkMasterProfileExists(email, countryCode, mobileNumber);

            if (isMasterProfileExists) {
                return callback(null, {}, 'userExists', 400);
            }

            //create master profile before creating patient
            const masterProfile = await masterProfileService.create({
                mobileNumber,
                countryCode,
                email,
                role: ['HR']
            })

            const newHrManager = await hrManagerService.create({
                firstName,
                lastName,
                countryCode,
                mobileNumber,
                email,
                dateOfBirth,
                employerId: new mongoose.Types.ObjectId(employerId),
                masterProfileId: new mongoose.Types.ObjectId(masterProfile._id),
            });

            callback(null, newHrManager, 'dataInsert');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    updateHRManager: async (req, res, callback) => {
        const { 
            firstName, 
            lastName, 
            dateOfBirth,
            employerId,
            hrManagerId
        } = req.body;
        const { _id} = req.decodedToken;

        try {
            // Your logic for updating an HR manager goes here

            const updatedHRManager = await hrManagerService.update(hrManagerId, {
                firstName,
                lastName,
                dateOfBirth,
                employerId : new mongoose.Types.ObjectId(employerId),
                updatedBy :  new mongoose.Types.ObjectId(_id),
            })

            callback(null, updatedHRManager, 'dataUpdated');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    deleteHRManager: async (req, res, callback) => {
        try {
            // Your logic for deleting an HR manager goes here
            // Example: await HRManager.findByIdAndDelete(req.params.id);
            callback(null, {}, 'dataDeleted');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getHRManager: async (req, res, callback) => {
        const { hrManagerId } = req.body;

        try {
            // Your logic for retrieving an HR manager goes here
            const hrManager = await hrManagerService.findOne({ _id : hrManagerId}, {
                firstName: 1,
                lastName : 1,
                email: 1,
                mobileNumber : 1,
                dateOfBirth: 1
            })

            callback(null, hrManager, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getHRManagers: async (req, res, callback) => {
        try {
            // Your logic for retrieving multiple HR managers goes here

            const hrManagers = await hrManagerService.find({},{
                firstName: 1,
                lastName : 1,
                email: 1,
                mobileNumber : 1,
                dateOfBirth: 1
            })

            callback(null, hrManagers, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
};

