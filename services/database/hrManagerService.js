const BaseService = require('./baseService');
const HRManager = require('../../models/hrManager');

class HRManagerService extends BaseService {
    constructor() {
        super(HRManager);
    }

    // Additional methods specific to HRManager can be added here if needed
}

module.exports = new HRManagerService();
