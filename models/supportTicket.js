const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supportTicketSchema = new Schema({
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
    email: { type: String, description: "Email of the person who submitted the document", default : null},
    submittedBy : { type: String, default : null },
    patientId: { type: mongoose.Schema.Types.ObjectId, description: "Patient ID"},
    createdBy: { type: String, description: "User who created the document", default: null},
    updatedBy: { type: String, description: "User who last updated the document",default: null },
    isDeleted: { type: Boolean, default: false, description: "Flag indicating if the document is deleted" },
    deletedBy: { type: String, description: "User who deleted the document",default: null },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('support-tickets', supportTicketSchema, 'support-tickets');

