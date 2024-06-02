const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: { type: String, default : null},
  ticketId: { type: mongoose.Schema.Types.ObjectId, default : null},
  serialNumber: { type: Number, default: null},
  attachments: [
    {
      _id : { type : mongoose.Schema.Types.ObjectId, required : true },
      key : { type : String, required : true },
      fileName :  { type : String, default : null }
    }
  ],
  senderId : { type : mongoose.Schema.Types.ObjectId, default :null },
  senderRole : { type: String, default : null},
  senderName : { type: String, default : null},
  senderProfileImage : { type : String, default : null},
  createdBy: { type: mongoose.Schema.Types.ObjectId, default : null},
  updatedBy: { type: mongoose.Schema.Types.ObjectId, default : null},
  isDeleted: { type: Boolean, default: false },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, default : null}
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('messages', messageSchema, 'messages');
