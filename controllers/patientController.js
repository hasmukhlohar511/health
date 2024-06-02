const patientService = require('../services/database/patientService');
const masterProfileService = require("../services/database/masterProfileService");
const mongoose = require('mongoose');

module.exports = {
    createPatient: async (req, res, callback) => {
        const { 
            firstName, 
            lastName, 
            countryCode,
            mobileNumber, 
            businessEmail, 
            personalEmail, 
            communicationEmail, 
            dateOfBirth, 
            employerId, 
            insuranceProvider, 
            primaryProviderName, 
            groupId 
        } = req.body;
        const { _id } = req.decodedToken;

        try {
            // Your logic for creating a patient goes here

            let email;
            if(communicationEmail === "BS") email = businessEmail
            if(communicationEmail === "PR") email = personalEmail

            const isMasterProfileExists = await masterProfileService.checkMasterProfileExists(email, countryCode, mobileNumber);

            if (isMasterProfileExists) {
                return callback(null, {}, 'userExists', 400);
            }
            
            //create master profile before creating patient
            const masterProfile = await masterProfileService.create({
                mobileNumber,
                countryCode,
                email,
                role : ['PA'],
                createdBy : new mongoose.Types.ObjectId(_id)
            })

            console.log("masterProfile",masterProfile)

            const newPatient = await patientService.create({
                firstName, 
                lastName, 
                countryCode,
                mobileNumber, 
                businessEmail, 
                personalEmail, 
                communicationEmail, 
                dateOfBirth, 
                employerId: new mongoose.Types.ObjectId(employerId), 
                insuranceProvider, 
                primaryProviderName, 
                groupId,
                createdBy : new mongoose.Types.ObjectId(_id),
                masterProfileId : new mongoose.Types.ObjectId(masterProfile._id),
            });

            callback(null, newPatient, 'dataInsert');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    updatePatient: async (req, res, callback) => {
        const { 
            patientId,
            firstName, 
            lastName, 
            countryCode,
            mobileNumber, 
            businessEmail, 
            personalEmail, 
            communicationEmail, 
            dateOfBirth, 
            employerId, 
            insuranceProvider, 
            primaryProviderName, 
            groupId 
        } = req.body;

        const { _id} = req.decodedToken;
        try {
            // Your logic for updating a patient goes here
            const patient = await patientService.findOne({ _id : patientId }, {masterProfileId : 1});
            
            let email;
            if(communicationEmail === "BS") email = businessEmail
            if(communicationEmail === "PR") email = personalEmail

            // Update email and number in master profile
            await masterProfileService.update( patient.masterProfileId,{
                countryCode,
                mobileNumber,
                email
            })
          
            const updatedPatient = await patientService.update(patientId, {
                firstName, 
                lastName,
                mobileNumber, 
                businessEmail, 
                personalEmail, 
                communicationEmail, 
                dateOfBirth, 
                primaryProviderName, 
                insuranceProvider, 
                groupId, 
                employerId : new mongoose.Types.ObjectId(employerId), 
                updatedBy: new mongoose.Types.ObjectId(_id)
            });

            callback(null, updatedPatient, 'dataUpdated');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    deletePatient: async (req, res, callback) => {
        const { patientId } = req.body; 
        try {

            // Your logic for deleting a patient goes here
            const response = await patientService.update({ _id : patientId }, {
                isDeleted : true
            })

            callback(null, response, 'dataDeleted');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getPatient: async (req, res, callback) => {
        const { patientId } = req.body;
        try {
            // Your logic for retrieving a patient goes here
            const patient = await patientService.findOne({ _id : patientId }, {
               firstName: 1,
               lastName : 1,
               mobileNumber: 1,
               countryCode : 1,
               businessEmail : 1,
               personalEmail: 1,
               communicationEmail: 1,
               dateOfBirth :1,
               insuranceProvider: 1,
               primaryProviderName :1,
               groupId : 1
            })

            callback(null, patient, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getPatients: async (req, res, callback) => {
        try {
            // Your logic for retrieving multiple patients goes here
            const patients = await patientService.getPatients();

            callback(null, patients, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
};

