const BaseService = require('./baseService');
const MasterProfile = require('../../models/masterProfile');

class MasterProfileService extends BaseService {
    constructor() {
        super(MasterProfile);
    }

    async findByQueryAndUpdate(query, data) {
        try {
            return await MasterProfile.updateOne(query, { $set : data});
        } catch (error) {
            throw new Error(`Error updating document: ${error.message}`);
        }
    }

    async findByQueryAndUpdateArray(query, update){
        try {
            return await MasterProfile.updateOne(query, update);
        } catch (error) {
            throw new Error(`Error updating document: ${error.message}`);
        }
    }

    async checkMasterProfileExists(email, countryCode, mobileNumber){
        try {
            if (email && mobileNumber && countryCode) {
                // Check both email and mobile number with country code
                const emailQuery = { email };
                const mobileQuery = { mobileNumber, countryCode };
    
                const emailExists = await this.checkExistence(emailQuery);
                if (emailExists) {
                    return true;
                }
    
                const mobileExists = await this.checkExistence(mobileQuery);
                if (mobileExists) {
                    return true;
                }

                console.log("11111111", emailExists, mobileExists, emailQuery, mobileQuery)
    
                return false;
            } else {
                // Check only email or only mobile number with country code
                const query = {};

                if (email) {
                    query.email = email;
                }
                if (mobileNumber && countryCode) {
                    query.mobileNumber = mobileNumber;
                    query.countryCode = countryCode;
                }
    
                const exists = await this.checkExistence(query);

                if (exists) {
                    return true;
                }

                return false;
            }
        } catch (error) {
            throw new Error(`Error checkMasterProfileExists document: ${error.message}`);
        }
    }

    // Additional methods specific to MasterProfile can be added here if needed
}

module.exports = new MasterProfileService();
