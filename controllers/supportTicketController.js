const supportTicketService = require("../services/database/supportTicketService");
const { S3 } = require('../services/awsService');
const mongoose = require('mongoose');


module.exports = {
    createSupportTicket: async (req, res, callback) => {
        let { _id, name, email } = req.decodedToken;
        let {
            subject,
            comment,
            attachments
        } = req.body;

        try {
            // Your logic for creating a support ticket goes here

            // make schema based object for an attachment            
            const formattedAttachments = attachments.map(att => ({
                _id: new mongoose.Types.ObjectId(),
                fileKey: att.fileKey,
                fileName: att.fileName || null
            }));

            const supportTicketCount = await supportTicketService.count({ patientId: _id });

            const newSupportTicket = await supportTicketService.create({
                subject,
                comment,
                attachments: formattedAttachments,
                submittedBy: name,
                email,
                patientId: new mongoose.Types.ObjectId(_id),
                createdBy: new mongoose.Types.ObjectId(_id),
                serialNumber: supportTicketCount + 1
            });

            callback(null, newSupportTicket, 'dataInsert');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    updateSupportTicket: async (req, res, callback) => {
        try {
            // Your logic for updating a support ticket goes here
            // Example: await SupportTicket.findByIdAndUpdate(req.params.id, req.body);
            callback(null, {}, 'dataUpdated');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    deleteSupportTicket: async (req, res, callback) => {
        try {
            // Your logic for deleting a support ticket goes here
            // Example: await SupportTicket.findByIdAndDelete(req.params.id);
            callback(null, {}, 'dataDeleted');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getSupportTicket: async (req, res, callback) => {
        const { supportTicketId } = req.body;

        try {
            // Your logic for retrieving a support ticket goes here
            let supportTicket = await supportTicketService.findOne({ _id: supportTicketId }, {
                createdBy: 0,
                deletedBy: 0,
                updatedBy: 0,
                createdAt: 0,
                updatedAt: 0,
                patientId: 0,
                employerId: 0,
                createdBy: 0,
                isDeleted: 0,
                __v: 0
            });

            const s3Service = new S3(process.env.AWS_S3_BUCKET, process.env.AWS_S3_URL);

            const attachments = [];
            if (supportTicket && supportTicket.attachments) {
                // Iterate over attachments and get signed URLs
                for (let index = 0; index < supportTicket.attachments.length; index++) {
                    const element = supportTicket.attachments[index];
                    try {
                        const fileUrl = await s3Service.getPreSignedURL(element.fileKey, '1h');

                        attachments.push({
                            signedUrl: fileUrl.url,
                            ...element._doc
                        })
                    } catch (urlError) {
                        console.error("Error getting signed URL for:", element.fileKey, urlError);
                    }
                }
            }


            supportTicket._doc['attachments'] = attachments;

            // Example: const supportTicket = await SupportTicket.findById(req.params.id);
            callback(null, supportTicket, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getSupportTickets: async (req, res, callback) => {
        let { _id, role } = req.decodedToken;

        try {
            let query = {};

            // Your logic for retrieving multiple support tickets goes here
            if (role === "PA") {
                query['patientId'] = new mongoose.Types.ObjectId(_id)
            }

            const project = { _id: 1, subject: 1, submittedBy: 1, email: 1, createdAt: 1, status: 1, serialNumber: 1 };

            const supportTickets = await supportTicketService.find(query, project);

            callback(null, supportTickets, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
};
