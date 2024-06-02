const BaseService = require('./baseService');
const Admin = require('../../models/admin');

class AdminService extends BaseService {
    constructor() {
        super(Admin);
    }

    // Additional methods specific to Admin can be added here if needed
}

module.exports = new AdminService();
