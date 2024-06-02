const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    description: "First name of the employer"
  },
  lastName: {
    type: String,
    required: true,
    description: "Last name of the employer"
  },
  mobileNumber: {
    type: String,
    required: true,
    description: "Mobile number of the employer"
  },
  email: {
    type: String,
    required: true,
    description: "Email of the employer"
  },
  dateOfBirth: {
    type: String,
    required: true,
    description: "Date of birth of the employer"
  },
  employerName: {
    type: String,
    required: true,
    description: "Name of the employer's company"
  },
  plan: {
    type: String,
    enum: ['VIP', 'Silver', 'Gold', 'Platinum'],
    required: true,
    description: "Employer's plan"
  },
  masterProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    description: "Master profile ID of the employer"
  },
  countryCode: {
    type: String,
    description: "Country code of the employer's mobile number"
  },
  createdBy: {
    type: String,
    required: true,
    description: "User who created the document"
  },
  updatedBy: {
    type: String,
    description: "User who last updated the document"
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
    description: "Flag indicating if the document is deleted"
  },
  deletedBy: {
    type: String,
    description: "User who deleted the document"
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
    description: "Timestamp when the document was created"
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
    description: "Timestamp when the document was last updated"
  }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('employers', employerSchema, 'employers');
