
const familyMemberService = require("../services/database/familyMemberService");
const mongoose = require('mongoose');

module.exports = {
    createFamilyMember: async (req, res, callback) => {
        const { 
            firstName, 
            lastName,
            spouse, 
            countryCode,
            mobileNumber, 
            businessEmail, 
            personalEmail, 
            communicationEmail, 
            dateOfBirth, 
            insuranceProvider, 
            primaryProviderName, 
            groupId 
        } = req.body;
        const { _id } = req.decodedToken;

        try {

            const newFamilyMember = await familyMemberService.create({
                firstName, 
                lastName,
                spouse, 
                countryCode,
                mobileNumber, 
                businessEmail, 
                personalEmail, 
                communicationEmail, 
                dateOfBirth, 
                insuranceProvider, 
                primaryProviderName,
                groupId,
                patientId : new mongoose.Types.ObjectId(_id),
                createdBy : new mongoose.Types.ObjectId(_id),
            })

            callback(null, newFamilyMember, 'dataInsert');
        } catch (error) {
            callback(error, null, null);
        }
    },
    updateFamilyMember: async (req, res, callback) => {
        try {
            callback(null, updatedFamilyMember, 'dataUpdated');
        } catch (error) {
            callback(error, null, null);
        }
    },
    deleteFamilyMember: async (req, res, callback) => {
        try {
            callback(null, {}, 'dataDeleted');
        } catch (error) {
            callback(error, null, null);
        }
    },
    getFamilyMember: async (req, res, callback) => {
        try {
            callback(null, familyMember, 'dataFound');
        } catch (error) {
            callback(error, null, null);
        }
    },
    getFamilyMembers: async (req, res, callback) => {
        const { _id } = req.decodedToken;
        try {
            
            const familyMembers = await familyMemberService.find(
                { patientId : _id},
                {
                    firstName : 1,
                    lastName : 1,
                    email : 1,
                    mobileNumber : 1,
                    countryCode : 1
                }
            );

            callback(null, familyMembers, 'dataFound');
        } catch (error) {
            callback(error, null, null);
        }
    },
};
