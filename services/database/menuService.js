const BaseService = require('./baseService');
const Menu = require('../../models/menu');

class MenuService extends BaseService {
    constructor() {
        super(Menu);
    }

    // Additional methods specific to HRManager can be added here if needed
}

module.exports = new MenuService();
