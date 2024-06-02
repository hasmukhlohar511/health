const messageService = require('../services/database/messageService');
const mongoose = require('mongoose');

module.exports = {
    createMessage: async (req, res, callback) => {
        const { text, ticketId, attachments } = req.body;
        const { id, role, name, image } = req.decodedToken
        try {

            // make schema based object for an attachment            
            let formattedAttachments = [];

            if (attachments && attachments.length > 0) {
                formattedAttachments = attachments.map(att => ({
                    _id: new mongoose.Types.ObjectId(),
                    key: att.key,
                    fileName: att.fileName || null
                }));   
            }

            const messageCount = await messageService.count({ ticketId })

            const newMessage = await messageService.create({
                text,
                ticketId,
                serialNumber: messageCount + 1,
                senderId: new mongoose.Types.ObjectId(id),
                createdBy: new mongoose.Types.ObjectId(id),
                senderName: name,
                attachments: formattedAttachments,
                senderRole: role,
                senderProfileImage: image
            });

            callback(null, newMessage, 'dataInsert');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    // updateMessage: async (req, res, callback) => {
    //     try {
    //         // Add your logic here for updating a message

    //         callback(null, {}, 'Message updated successfully');
    //     } catch (error) {
    //         // If any error occurs during the process, pass it to the callback
    //         callback(error, null, 'Error updating message');
    //     }
    // },
    // deleteMessage: async (req, res, callback) => {
    //     try {
    //         // Add your logic here for deleting a message

    //         callback(null, {}, 'Message deleted successfully');
    //     } catch (error) {
    //         // If any error occurs during the process, pass it to the callback
    //         callback(error, null, 'Error deleting message');
    //     }
    // },
    getMessage: async (req, res, callback) => {
        const { messageId } = req.body;
        try {
            // Add your logic here for retrieving a single message
            const message = await messageService.findOne({ _id: messageId }, {
                text: 1,
                serialNumber: 1,
                senderName: 1,
                senderProfileImage: 1,
                createdAt: 1
            })

            callback(null, message, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getMessages: async (req, res, callback) => {
        const { ticketId } = req.body;
        try {
            // Add your logic here for retrieving multiple messages
            const messages = await messageService.find({ ticketId }, {
                text: 1,
                serialNumber: 1,
                senderName: 1,
                senderProfileImage: 1,
                createdAt: 1
            })

            callback(null, messages, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
};

