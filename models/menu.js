const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    name: { type: String, required: true },
    key: { type: String, required: true },
    roles: { type: [String], default : []},
    createdBy: { type: Schema.Types.ObjectId, default : null},
    updatedBy: {
        type: String,
        description: "User who last updated the document"
    },
    isDeleted: {
        type: Boolean,
        default: false,
        description: "Flag indicating if the document is deleted"
    },
    deletedBy: {
        type: String,
        description: "User who deleted the document"
    }
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('menus', MenuSchema, 'menus');
