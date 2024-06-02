const BaseService = require('./baseService');
const DigitalFingerPrint = require('../../models/digitalFingerPrint');

class DigitalFingerPrintService extends BaseService {
    constructor() {
        super(DigitalFingerPrint);
    }

    // Additional methods specific to DigitalFingerPrint can be added here if needed
}

module.exports = new DigitalFingerPrintService();
