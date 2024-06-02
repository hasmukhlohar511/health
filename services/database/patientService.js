const BaseService = require('./baseService');
const Patient = require('../../models/patient');

class PatientService extends BaseService {
    constructor() {
        super(Patient);
    }

    async getPatients(){
        return await Patient.aggregate([
            {
              '$lookup': {
                'from': 'employers', 
                'let': {
                  'employerId': '$employerId'
                }, 
                'pipeline': [
                  {
                    '$match': {
                      '$expr': {
                        '$eq': [
                          '$_id', '$$employerId'
                        ]
                      }
                    }
                  }, {
                    '$project': {
                      'firstName': 1, 
                      'lastName': 1, 
                      '_id': 0
                    }
                  }
                ], 
                'as': 'employer'
              }
            }, {
              '$addFields': {
                'employerName': {
                  '$concat': [
                    {
                      '$first': '$employer.firstName'
                    }, ' ', {
                      '$first': '$employer.lastName'
                    }
                  ]
                }
              }
            }, {
              '$project': {
                '_id': 1, 
                'firstName': 1, 
                'lastName': 1, 
                'businessEmail': 1, 
                'mobileNumber': 1, 
                'employerName': 1
              }
            }
        ])
    }

    // Additional methods specific to Patient can be added here if needed
}

module.exports = new PatientService();
