const subAdminService = require('../services/database/subAdminService');
const masterProfileService = require("../services/database/masterProfileService");
const mongoose = require("mongoose");

module.exports = {
    createSubAdmin: async (req, res, callback) => {
        const {
            firstName,
            lastName,
            countryCode,
            mobileNumber,
            email,
            dateOfBirth,
        } = req.body;

        const { _id } = req.decodedToken;
        try {
            // Your logic for creating a sub admin goes here
            const isMasterProfileExists = await masterProfileService.checkMasterProfileExists(email, countryCode, mobileNumber);

            if (isMasterProfileExists) {
                return callback(null, {}, 'userExists', 400);
            }

            //create master profile before creating sub admin
            const masterProfile = await masterProfileService.create({
                mobileNumber,
                countryCode,
                email,
                role: ['AD']
            })

            const newSubAdmin = await subAdminService.create({
                firstName,
                lastName,
                countryCode,
                mobileNumber,
                email,
                dateOfBirth,
                masterProfileId: new mongoose.Types.ObjectId(masterProfile._id),
                createdBy: new mongoose.Types.ObjectId(_id),
            });

            callback(null, newSubAdmin, 'dataInsert');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    updateSubAdmin: async (req, res, callback) => {
        const { 
            firstName, 
            lastName, 
            dateOfBirth,
            subAdminId
        } = req.body;
        const { _id} = req.decodedToken;

        try {
            // Your logic for updating sub admin goes here
            const updatedAdmin = await subAdminService.update(subAdminId, {
                firstName,
                lastName,
                dateOfBirth,
                updatedBy : new mongoose.Types.ObjectId(_id)
            })

            callback(null, updatedAdmin, 'dataUpdated');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    deleteSubAdmin: async (req, res, callback) => {
        try {
            // Your logic for deleting a sub admin goes here
            // Example: await SubAdmin.findByIdAndDelete(req.params.id);
            callback(null, {}, 'dataDeleted');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getSubAdmin: async (req, res, callback) => {
        const { subAdminId } = req.body;
        try {
            
            const subAdmin = await subAdminService.findOne({ _id : subAdminId}, {
                firstName: 1,
                lastName : 1,
                email: 1,
                mobileNumber : 1,
                dateOfBirth: 1
            })

            callback(null, subAdmin, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getSubAdmins: async (req, res, callback) => {
        try {
            // Your logic for retrieving multiple sub admins goes here
          
            const subAdmins = await subAdminService.find({},{
                firstName: 1,
                lastName : 1,
                email: 1,
                mobileNumber : 1,
                dateOfBirth: 1
            })
            callback(null, subAdmins, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
};

