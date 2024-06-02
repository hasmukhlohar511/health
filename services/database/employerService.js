const BaseService = require('./baseService');
const Employer = require('../../models/employers');

class EmployerService extends BaseService {
    constructor() {
        super(Employer);
    }

    // Additional methods specific to Employer can be added here if needed
}

module.exports = new EmployerService();
