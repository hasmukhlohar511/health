const BaseService = require('./baseService');
const CustomerRepresentative = require('../../models/customerRepresentative');

class CustomerRepresentativeService extends BaseService {
    constructor() {
        super(CustomerRepresentative);
    }

    // Additional methods specific to CustomerRepresentative can be added here if needed
}

module.exports = new CustomerRepresentativeService();
