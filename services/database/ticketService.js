const BaseService = require('./baseService');
const Ticket = require('../../models/ticket');

class TicketService extends BaseService {
    constructor() {
        super(Ticket);
    }

    // Additional methods specific to Ticket can be added here if needed
}

module.exports = new TicketService();
