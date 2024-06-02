module.exports = {
    // Authentication module 
    'sendOtp': { moduleName: 'authentication', functionName: 'sendOtp', access: 'public', routeName: 'sendOtp' },
    'verifyOtp': { moduleName: 'authentication', functionName: 'verifyOtp', access: 'public', routeName: 'verifyOtp' },
    'generateToken': { moduleName: 'authentication', functionName: 'generateToken', access: 'public', routeName: 'generateToken' },
    'getUser': { moduleName: 'authentication', functionName: 'getUser', access: 'private', routeName: 'getUser' },
    'logout': { moduleName: 'authentication', functionName: 'logout', access: 'private', routeName: 'logout' },

    // Menu module
    'getMenus': { moduleName: 'menu', functionName: 'getMenus', access: 'private', routeName: 'getMenus' },
    'createMenu': { moduleName: 'menu', functionName: 'createMenu', access: 'private', routeName: 'createMenu' },

    // Ticket module
    'createTicket': { moduleName: 'ticket', functionName: 'createTicket', access: 'private', routeName: 'createTicket' },
    'getTickets': { moduleName: 'ticket', functionName: 'getTickets', access: 'private', routeName: 'getTickets' },
    'getTicket': { moduleName: 'ticket', functionName: 'getTicket', access: 'private', routeName: 'getTicket' },
    'updateTicket': { moduleName: 'ticket', functionName: 'updateTicket', access: 'private', routeName: 'updateTicket' },

    // File Module
    'uploadFiles': { moduleName: 'file', functionName: 'uploadFiles', access: 'private', routeName: 'uploadFiles' },
    'getSignedUrl': { moduleName: 'file', functionName: 'getSignedUrl', access: 'private', routeName: 'getSignedUrl' },

    // Employer Module
    'createEmployer': { moduleName: 'file', functionName: 'createEmployer', access: 'private', routeName: 'createEmployer' },
    'updateEmployer': { moduleName: 'file', functionName: 'updateEmployer', access: 'private', routeName: 'updateEmployer' },
    'deleteEmployer': { moduleName: 'file', functionName: 'deleteEmployer', access: 'private', routeName: 'deleteEmployer' },
    'getEmployer': { moduleName: 'file', functionName: 'getEmployer', access: 'private', routeName: 'getEmployer' },
    'getEmployers': { moduleName: 'file', functionName: 'getEmployers', access: 'private', routeName: 'getEmployers' },

    // Sub Admin Module
    'createSubAdmin': { moduleName: 'subAdmin', functionName: 'createSubAdmin', access: 'private', routeName: 'createSubAdmin' },
    'updateSubAdmin': { moduleName: 'subAdmin', functionName: 'updateSubAdmin', access: 'private', routeName: 'updateSubAdmin' },
    'deleteSubAdmin': { moduleName: 'subAdmin', functionName: 'deleteSubAdmin', access: 'private', routeName: 'deleteSubAdmin' },
    'getSubAdmin': { moduleName: 'subAdmin', functionName: 'getSubAdmin', access: 'private', routeName: 'getSubAdmin' },
    'getSubAdmins': { moduleName: 'subAdmin', functionName: 'getSubAdmins', access: 'private', routeName: 'getSubAdmins' },

    // HR Manager Module
    'createHRManager': { moduleName: 'hrManager', functionName: 'createHRManager', access: 'private', routeName: 'createHRManager' },
    'updateHRManager': { moduleName: 'hrManager', functionName: 'updateHRManager', access: 'private', routeName: 'updateHRManager' },
    'deleteHRManager': { moduleName: 'hrManager', functionName: 'deleteHRManager', access: 'private', routeName: 'deleteHRManager' },
    'getHRManager': { moduleName: 'hrManager', functionName: 'getHRManager', access: 'private', routeName: 'getHRManager' },
    'getHRManagers': { moduleName: 'hrManager', functionName: 'getHRManagers', access: 'private', routeName: 'getHRManagers' },

    // Customer Representative Manager Module
    'createCustomerRepresentative': { moduleName: 'customerRepresentative', functionName: 'createCustomerRepresentative', access: 'private', routeName: 'createCustomerRepresentative' },
    'updateCustomerRepresentative': { moduleName: 'customerRepresentative', functionName: 'updateCustomerRepresentative', access: 'private', routeName: 'updateCustomerRepresentative' },
    'deleteCustomerRepresentative': { moduleName: 'customerRepresentative', functionName: 'deleteCustomerRepresentative', access: 'private', routeName: 'deleteCustomerRepresentative' },
    'getCustomerRepresentative': { moduleName: 'customerRepresentative', functionName: 'getCustomerRepresentative', access: 'private', routeName: 'getCustomerRepresentative' },
    'getCustomerRepresentatives': { moduleName: 'customerRepresentative', functionName: 'getCustomerRepresentatives', access: 'private', routeName: 'getCustomerRepresentatives' },

    // Patient Manager Module
    'createPatient': { moduleName: 'patient', functionName: 'createPatient', access: 'private', routeName: 'createPatient' },
    'updatePatient': { moduleName: 'patient', functionName: 'updatePatient', access: 'private', routeName: 'updatePatient' },
    'deletePatient': { moduleName: 'patient', functionName: 'deletePatient', access: 'private', routeName: 'deletePatient' },
    'getPatient': { moduleName: 'patient', functionName: 'getPatient', access: 'private', routeName: 'getPatient' },
    'getPatients': { moduleName: 'patient', functionName: 'getPatients', access: 'private', routeName: 'getPatients' },

    // Admin Module
    'createAdmin': { moduleName: 'admin', functionName: 'createAdmin', access: 'private', routeName: 'createAdmin' },
    'updateAdmin': { moduleName: 'admin', functionName: 'updateAdmin', access: 'private', routeName: 'updateAdmin' },
    'deleteAdmin': { moduleName: 'admin', functionName: 'deleteAdmin', access: 'private', routeName: 'deleteAdmin' },
    'getAdmin': { moduleName: 'admin', functionName: 'getAdmin', access: 'private', routeName: 'getAdmin' },
    'getAdmins': { moduleName: 'admin', functionName: 'getAdmins', access: 'private', routeName: 'getAdmins' },

    // Master Profile Module
    'createMasterProfile': { moduleName: 'masterProfile', functionName: 'createMasterProfile', access: 'private', routeName: 'createMasterProfile' },
    'updateMasterProfile': { moduleName: 'masterProfile', functionName: 'updateMasterProfile', access: 'private', routeName: 'updateMasterProfile' },
    'deleteMasterProfile': { moduleName: 'masterProfile', functionName: 'deleteMasterProfile', access: 'private', routeName: 'deleteMasterProfile' },
    'getMasterProfile': { moduleName: 'masterProfile', functionName: 'getMasterProfile', access: 'private', routeName: 'getMasterProfile' },
    'getMasterProfiles': { moduleName: 'masterProfile', functionName: 'getMasterProfiles', access: 'private', routeName: 'getMasterProfiles' },

    // Message Module
    'createMessage': { moduleName: 'message', functionName: 'createMessage', access: 'private', routeName: 'createMessage' },
    'updateMessage': { moduleName: 'message', functionName: 'updateMessage', access: 'private', routeName: 'updateMessage' },
    'deleteMessage': { moduleName: 'message', functionName: 'deleteMessage', access: 'private', routeName: 'deleteMessage' },
    'getMessage': { moduleName: 'message', functionName: 'getMessage', access: 'private', routeName: 'getMessage' },
    'getMessages': { moduleName: 'message', functionName: 'getMessages', access: 'private', routeName: 'getMessages' },

    // Message Module
    'createFingerprint': { moduleName: 'digitalFingerPrint', functionName: 'createFingerprint', access: 'private', routeName: 'createFingerprint' },
    'updateFingerprint': { moduleName: 'digitalFingerPrint', functionName: 'updateFingerprint', access: 'private', routeName: 'updateFingerprint' },
    'deleteFingerprint': { moduleName: 'digitalFingerPrint', functionName: 'deleteFingerprint', access: 'private', routeName: 'deleteFingerprint' },
    'getFingerprint': { moduleName: 'digitalFingerPrint', functionName: 'getFingerprint', access: 'private', routeName: 'getFingerprint' },
    'getFingerprints': { moduleName: 'digitalFingerPrint', functionName: 'getFingerprints', access: 'private', routeName: 'getFingerprints' },

    // Family Member Module
    'createFamilyMember': { moduleName: 'familyMember', functionName: 'createFamilyMember', access: 'private', routeName: 'createFamilyMember' },
    'updateFamilyMember': { moduleName: 'familyMember', functionName: 'updateFamilyMember', access: 'private', routeName: 'updateFamilyMember' },
    'deleteFamilyMember': { moduleName: 'familyMember', functionName: 'deleteFamilyMember', access: 'private', routeName: 'deleteFamilyMember' },
    'getFamilyMember': { moduleName: 'familyMember', functionName: 'getFamilyMember', access: 'private', routeName: 'getFamilyMember' },
    'getFamilyMembers': { moduleName: 'familyMember', functionName: 'getFamilyMembers', access: 'private', routeName: 'getFamilyMembers' },

    // Support Ticket Module
    'createSupportTicket': { moduleName: 'supportTicket', functionName: 'createSupportTicket', access: 'private', routeName: 'createSupportTicket' },
    'updateSupportTicket': { moduleName: 'supportTicket', functionName: 'updateSupportTicket', access: 'private', routeName: 'updateSupportTicket' },
    'deleteSupportTicket': { moduleName: 'supportTicket', functionName: 'deleteSupportTicket', access: 'private', routeName: 'deleteSupportTicket' },
    'getSupportTicket': { moduleName: 'supportTicket', functionName: 'getSupportTicket', access: 'private', routeName: 'getSupportTicket' },
    'getSupportTickets': { moduleName: 'supportTicket', functionName: 'getSupportTickets', access: 'private', routeName: 'getSupportTickets' },
};
