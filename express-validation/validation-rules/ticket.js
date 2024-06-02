module.exports = function (routeName, userLanguage, check, messages) {
    switch (routeName) {
        case 'createTicket':
            return [
                check("subject").notEmpty().withMessage(messages[userLanguage].errorMessages.subjectRequired),
                check("comment").notEmpty().withMessage(messages[userLanguage].errorMessages.commentRequired),
                check("additionalNote").notEmpty().withMessage(messages[userLanguage].errorMessages.additionalNoteRequired),
                check("attachments").isArray().withMessage(messages[userLanguage].errorMessages.invalidAttachments),
                check("attachments.*.fileKey").notEmpty().withMessage(messages[userLanguage].errorMessages.attachmentKeyRequired),
                check("attachments.*.fileName").notEmpty().withMessage(messages[userLanguage].errorMessages.attachmentFileNameRequired)
            ];

        case 'getTicket':
            return [
                check("ticketId").notEmpty().withMessage(messages[userLanguage].errorMessages.ticketIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.ticketIdMongoId),
            ];

        case 'getTickets':
            return [
                check("employerId").optional().isMongoId().withMessage(messages[userLanguage].errorMessages.employerIdMongoId),
            ];

        case 'updateTicket':
            return [
                check("ticketId").notEmpty().withMessage(messages[userLanguage].errorMessages.ticketIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.ticketIdMongoId),
                check("status").optional().isIn(['OP', 'CL', 'AS', 'WO', 'RE'])
                .withMessage(messages[userLanguage].errorMessages.invalidTicketStatus),
                check("internalNote").optional().isString().withMessage(messages[userLanguage].errorMessages.internalNoteIsString),
                check("customerRepId").optional().isMongoId().withMessage(messages[userLanguage].errorMessages.customerRepMongoId)       
            ];
        default:
            return [];
    }
}
