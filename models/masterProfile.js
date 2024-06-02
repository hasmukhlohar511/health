const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const masterProfileSchema = new Schema({
    mobileNumber: { type: String, default: null },
    countryCode: { type: String, default: null },
    email: { type: String, default: null },
    otp: { type: Number, default: 999999},
    otpExpiresAt : { type: Date, default: Date.now()},
    role: {  type: [String], required: true,   enum: ['AD','SAD','CR', 'HR','PA'] }, // AD : admin, SAD : sub admin, CR : customer-representatives, HR : Human resource manager, PA : patients
    blackListedToken : {type : Array, default : []},
    createdBy: { type: Schema.Types.ObjectId, default: null },
    updatedBy: { type: Schema.Types.ObjectId, default: null },
    deletedBy: { type: Schema.Types.ObjectId, default: null },
    isDeleted: { type: Boolean, default: false}
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('master-profiles', masterProfileSchema, 'master-profiles');
