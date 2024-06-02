const BaseService = require('./baseService');
const FamilyMember = require('../../models/familyMember');

class FamilyMemberService extends BaseService {
    constructor() {
        super(FamilyMember);
    }

    // Additional methods specific to FamilyMember can be added here if needed
}

module.exports = new FamilyMemberService();
