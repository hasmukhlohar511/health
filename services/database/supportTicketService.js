const BaseService = require('./baseService');
const SupportTicket = require('../../models/supportTicket');

class SupportTicketService extends BaseService {
    constructor() {
        super(SupportTicket);
    }

    // Additional methods specific to SupportTicket can be added here if needed
}

module.exports = new SupportTicketService();
