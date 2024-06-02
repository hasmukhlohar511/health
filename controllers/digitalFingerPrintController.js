const DigitalFingerprintService = require('../services/database/digitalFingerPrintService'); // Adjust the path as necessary
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    createFingerprint: async (req, res, callback) => {
        const { userAgent, ipAddress, verificationEmail, timestamps, ticketId } = req.body;
        const { _id } = req.decodedToken;

        try {
            const uniqueId = uuidv4();

            const newFingerPrint = await DigitalFingerprintService.create({
                userAgent,
                ipAddress,
                verificationEmail,
                timestamps,
                ticketId,
                uniqueId,
                createdBy : new mongoose.Types.ObjectId(_id)
            });

            callback(null, newFingerPrint, 'dataInsert');
        } catch (error) {
            callback(error, null, null);
        }
    },
    getFingerprint: async (req, res, callback) => {
        const { ticketId } = req.body;
        try {
            const fingerPrint = await DigitalFingerprintService.findOne({ticketId }, {
                _id : 1,
                userAgent : 1,
                ipAddress : 1,
                verificationEmail : 1,
                timestamps : 1
            })

            callback(null, fingerPrint, 'dataFound');
        } catch (error) {
            callback(error, null, null);
        }
    },
    getFingerprints: async (req, res, callback) => {
        try {
            callback(null, fingerprints, 'dataFound');
        } catch (error) {
            callback(error, null, null);
        }
    }
};