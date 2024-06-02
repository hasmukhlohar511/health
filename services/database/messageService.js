const BaseService = require('./baseService');
const Message = require('../../models/message');

class MessageService extends BaseService {
    constructor() {
        super(Message);
    }

    // Additional methods specific to Message can be added here if needed
}

module.exports = new MessageService();
