const ticketService = require('../services/database/ticketService');
const { S3 } = require('../services/awsService');
const { TICKET_STATUS_CONSTANT } = require("../utils/constants");
const DEFAULT_CONSTANT = 'open'
const mongoose = require('mongoose');

module.exports = {
    createTicket: async (req, res, callback) => {
        let { _id, name, email, employerId } = req.decodedToken;
        let {
            subject,
            comment,
            attachments,
            additionalNote
        } = req.body;

        try {
            // make schema based object for an attachment            
            const formattedAttachments = attachments.map(att => ({
                _id: new mongoose.Types.ObjectId(),
                fileKey: att.fileKey,
                fileName: att.fileName || null
            }));

            if (employerId && typeof employerId != 'undefined') {
                employerId = new mongoose.Types.ObjectId(customerRep)
            } else {
                employerId = null
            }

            const ticketCount = await ticketService.count({ _id });

            const newTicket = await ticketService.create({
                subject,
                comment,
                attachments: formattedAttachments,
                submittedBy: name,
                email,
                patientId: new mongoose.Types.ObjectId(_id),
                additionalNote,
                employerId,
                createdBy: new mongoose.Types.ObjectId(_id),
                serialNumber: ticketCount + 1
            });

            callback(null, newTicket, 'dataInsert', 201);
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getTickets: async (req, res, callback) => {
        let { _id, role } = req.decodedToken;

        try {
            let { employerId, patientId } = req.body;

            let query = {};

            if (employerId && employerId != "undefined") {
                query['employerId'] = new mongoose.Types.ObjectId(employerId)
            }

            if (role === "PA") {
                query['patientId'] = new mongoose.Types.ObjectId(_id)
            }

            const project = { _id: 1, subject: 1, submittedBy: 1, email: 1, createdAt: 1, status: 1, serialNumber: 1 };

            const tickets = await ticketService.find(query, project);

            callback(null, tickets, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getTicket: async (req, res, callback) => {
        try {
            const { ticketId } = req.body;

            let ticket = await ticketService.findOne({ _id: ticketId }, {
                updatedAt: 0,
                patientId: 0,
                employerId: 0,
                createdBy: 0,
                isDeleted: 0,
                __v: 0
            });

            const s3Service = new S3(process.env.AWS_S3_BUCKET, process.env.AWS_S3_URL);

            const attachments = [];

            if (ticket && ticket.attachments) {
                // Iterate over attachments and get signed URLs
                for (let index = 0; index < ticket.attachments.length; index++) {
                    const element = ticket.attachments[index];
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

            ticket._doc['attachments'] = attachments;

            callback(null, ticket, 'dataFound', 201);
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    updateTicket: async (req, res, callback) => {
        try {
            const { ticketId, status, internalNote, customerRepId } = req.body;

            let data = { status };

            // if (status) {
            //     data['status'] = TICKET_STATUS_CONSTANT[status]
            // }

            if (internalNote) {
                data['internalNote'] = internalNote
            }

            if (customerRepId) {
                data['customerRepId'] = customerRepId
            }

            const response = await ticketService.update(ticketId, data);
            callback(null, response, 'dataUpdated', 200);
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    }
};
