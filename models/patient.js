const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  firstName: { type: String, default : null },
  lastName: { type: String, default : null },
  mobileNumber: { type: String, default : null},
  countryCode: { type: String, default : null},
  businessEmail: { type: String, default : null},
  personalEmail: { type: String, default : null},
  communicationEmail: { type: String, default : null},
  dateOfBirth: { type: String, default : null},
  primaryProviderName: { type: String, default : null},
  insuranceProvider: { type: String, default : null},
  groupId: { type: String, default : null},
  employerId: { type: mongoose.Schema.Types.ObjectId, default : null },
  masterProfileId: { type: mongoose.Schema.Types.ObjectId, default : null },
  profileImage: {type : String, default : null},
  plan : {type : String, default : null},
  createdBy: { type: mongoose.Schema.Types.ObjectId, default : null },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, default : null },
  isDeleted: { type: Boolean, default: false },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, default : null }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('patients', patientSchema, 'patients');
