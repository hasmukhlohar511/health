const BaseService = require('./baseService');
const SubAdmin = require('../../models/subAdmin');

class SubAdminService extends BaseService {
    constructor() {
        super(SubAdmin);
    }

    // Additional methods specific to SubAdmin can be added here if needed
}

module.exports = new SubAdminService();
