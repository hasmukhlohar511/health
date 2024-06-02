const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  firstName: { type: String, default : null },
  lastName: { type: String, default : null },
  mobileNumber: { type: String, default : null },
  email: { type: String, default : null },
  dateOfBirth: { type: String, default : null },
  masterProfileId: { type: mongoose.Schema.Types.ObjectId, default : null },
  countryCode: { type: String, default : null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, default : null },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, default : null },
  isDeleted: { type: Boolean, default: false },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, default : null }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('admins', adminSchema, 'admins');
