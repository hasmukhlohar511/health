module.exports = function (routeName, userLanguage, check, messages) {
    switch (routeName) {
        case 'createSupportTicket':
            return [
                check("subject").notEmpty().withMessage(messages[userLanguage].errorMessages.subjectRequired),
                check("comment").notEmpty().withMessage(messages[userLanguage].errorMessages.commentRequired),
                check("attachments").isArray().withMessage(messages[userLanguage].errorMessages.invalidAttachments),
                check("attachments.*.fileKey").notEmpty().withMessage(messages[userLanguage].errorMessages.attachmentKeyRequired),
                check("attachments.*.fileName").notEmpty().withMessage(messages[userLanguage].errorMessages.attachmentFileNameRequired)
            ];

        case 'getSupportTicket':
            return [
                check("supportTicketId").notEmpty().withMessage(messages[userLanguage].errorMessages.supportTicketIdRequired)
                    .isMongoId().withMessage(messages[userLanguage].errorMessages.supportTicketIdMongoId),
            ];

        default:
            return [];
    }
}
