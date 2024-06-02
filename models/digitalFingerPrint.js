const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const digitalFingerPrintSchema = new Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, default: null },
  uniqueId : { type: String, default : null },
  userAgent: { type: String, default: null},
  ipAddress: { type: String, default: null},
  verificationEmail : { type: String, default : null},
  additionalData: { type: Object, default : {} },
  timestamps : { type : Date, default : Date.now()},
  createdBy: { type: mongoose.Schema.Types.ObjectId, default: null },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
  isDeleted: { type: Boolean, default: false },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('digital-finger-prints', digitalFingerPrintSchema, 'digital-finger-prints');
