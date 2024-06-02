const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const familyMemberSchema = new Schema({
  firstName: { type: String, default : null },
  lastName: { type: String, default : null },
  mobileNumber: { type: String, default : null},
  countryCode: { type: String, default : null},
  patientId: { type: mongoose.Schema.Types.ObjectId, default: null },
  spouse: { type: String, default : null, enum: ['HU','WI','FA', 'MO','FA-IL', 'MO-IL', 'BR', 'SI', 'SO', 'DA', 'SL'] }, // Husband: HU, Wife: WI, Father : FA, Mother : MO, Father-in-Law : FA-IL, Mother-in-Law : MO-IL, Brother : BR, Sister : SI, Son: SO, Daughter : DA, Self : SL
  businessEmail: { type: String, default : null},
  personalEmail: { type: String, default : null},
  communicationEmail: { type: String, default : null},
  dateOfBirth: { type: String, default : null},
  primaryProviderName: { type: String, default : null},
  insuranceProvider: { type: String, default : null},
  groupId: { type: String, default : null},
  createdBy: { type: mongoose.Schema.Types.ObjectId, default: null },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
  isDeleted: { type: Boolean, default: false },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('family-members', familyMemberSchema, 'family-members');
