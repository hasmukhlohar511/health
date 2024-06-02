const adminService = require('../services/database/adminService');
const mailService = require('../services/mailService');
const masterProfileService = require("../services/database/masterProfileService");
const mongoose = require("mongoose");

module.exports = {
    createAdmin: async (req, res, callback) => {
        const {
            firstName,
            lastName,
            countryCode,
            mobileNumber,
            email,
            dateOfBirth,
        } = req.body;

        try {
            // Your logic for creating an admin goes here
            const isMasterProfileExists = await masterProfileService.checkMasterProfileExists(email, countryCode, mobileNumber);

            if (isMasterProfileExists) {
                return callback(null, {}, 'userExists', 400);
            }

            //create master profile before creating patient
            const masterProfile = await masterProfileService.create({
                mobileNumber,
                countryCode,
                email,
                role: ['AD']
            })

            const newAdmin = await adminService.create({
                firstName,
                lastName,
                countryCode,
                mobileNumber,
                email,
                dateOfBirth,
                masterProfileId: new mongoose.Types.ObjectId(masterProfile._id),
            });

            callback(null, newAdmin, 'dataInsert');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    updateAdmin: async (req, res, callback) => {
        const { 
            firstName, 
            lastName, 
            dateOfBirth
        } = req.body;
        const { _id} = req.decodedToken;

        try {
            // Your logic for updating an admin goes here
            const updatedAdmin = await adminService.update(_id, {
                firstName,
                lastName,
                dateOfBirth
            })

            callback(null, updatedAdmin, 'dataUpdated');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    deleteAdmin: async (req, res, callback) => {
        try {
            // Your logic for deleting an admin goes here
            // Example: await Admin.findByIdAndDelete(req.params.id);
            callback(null, {}, 'dataDeleted');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getAdmin: async (req, res, callback) => {
        try {
            // Your logic for retrieving an admin goes here
            // Example: const admin = await Admin.findById(req.params.id);
            callback(null, {}, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getAdmins: async (req, res, callback) => {
        try {
            // Your logic for retrieving multiple admins goes here
            // Example: const admins = await Admin.find({});
            callback(null, {}, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
};
