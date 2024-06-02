const customerRepService = require('../services/database/customerRepresentativeService');
const mailService = require('../services/mailService');
const masterProfileService = require("../services/database/masterProfileService");

const { mongoose } = require('mongoose');

module.exports = {
    createCustomerRepresentative: async (req, res, callback) => {
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
                role: ['CR']
            })

            const newCustomerRep = await customerRepService.create({
                firstName,
                lastName,
                countryCode,
                mobileNumber,
                email,
                dateOfBirth,
                employerId: new mongoose.Types.ObjectId(employerId),
                masterProfileId: new mongoose.Types.ObjectId(masterProfile._id),
            });

            callback(null, newCustomerRep, 'dataInsert');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    updateCustomerRepresentative: async (req, res, callback) => {
        const { 
            firstName, 
            lastName, 
            dateOfBirth,
            employerId,
            customerRepId
        } = req.body;
        const { _id} = req.decodedToken;

        try {
            // Your logic for updating a customer representative goes here

            const updatedCustomerRep = await customerRepService.update(customerRepId, {
                firstName,
                lastName,
                dateOfBirth,
                employerId : new mongoose.Types.ObjectId(employerId),
                updatedBy :  new mongoose.Types.ObjectId(_id),
            })

            callback(null, updatedCustomerRep, 'dataUpdated');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    deleteCustomerRepresentative: async (req, res, callback) => {
        try {
            // Your logic for deleting a customer representative goes here
            // Example: await CustomerRepresentative.findByIdAndDelete(req.params.id);
            callback(null, {}, 'dataDeleted');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getCustomerRepresentative: async (req, res, callback) => {
        const { customerRepId } = req.body;

        try {
            // Your logic for retrieving a customer representative goes here
            const customerRep = await customerRepService.findOne({ _id : customerRepId}, {
                firstName: 1,
                lastName : 1,
                email: 1,
                mobileNumber : 1,
                dateOfBirth: 1
            })

            callback(null, customerRep, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getCustomerRepresentatives: async (req, res, callback) => {
        try {
            // Your logic for retrieving multiple customer representatives goes here
            const customerReps = await customerRepService.find({},{
                firstName: 1,
                lastName : 1,
                email: 1,
                mobileNumber : 1,
                dateOfBirth: 1
            })
            callback(null, customerReps, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
};

