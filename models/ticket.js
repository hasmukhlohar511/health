const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  subject: { type: String, default : null},
  comment: { type: String, default : null },
  attachments: [
    {
      _id : { type : mongoose.Schema.Types.ObjectId, required : true },
      fileKey : { type : String, required : true },
      fileName :  { type : String, default : null }
    }
  ],
  serialNumber : {type : String, default : "0" },
  status: { type: String, description: "Status of the ticket", default : 'OP'}, // open, closed, assign, working, reopen
  additionalNote : {type : String, default : null},
  email: { type: String, description: "Email of the person who submitted the document", default : null},
  internalNote: { type: String, description: "Internal note", default:null },
  internalNoteVisibleToSubmitter : { type: Boolean, default : false },
  submittedby : { type: String, default:null},
  assignedToUser: { type: mongoose.Schema.Types.ObjectId, default: null },
  customerRepId: { type: mongoose.Schema.Types.ObjectId, default: null },
  employerId: { type: mongoose.Schema.Types.ObjectId, description: "Employer ID", default: null},
  patientId: { type: mongoose.Schema.Types.ObjectId, description: "Patient ID"},
  createdBy: { type: String, description: "User who created the document"},
  updatedBy: { type: String, description: "User who last updated the document"},
  isDeleted: { type: Boolean, default: false, description: "Flag indicating if the document is deleted" },
  deletedBy: { type: String, description: "User who deleted the document" },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('tickets', ticketSchema, 'tickets');

