const MenuService = require("../services/database/menuService");
const mongoose = require('mongoose');

module.exports = {
    getMenus: async (req, res, callback) => {
        const authHeader = req.headers['authorization'];
        console.log("authHeader",req.decodedToken)
        const { role } = req.body;
        try {
            const menus = await MenuService.find({ roles: role }, { name :1, key:1})

            callback(null, menus, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },

    createMenu: async (req, res, callback) => {
        try {
            const { name, key, roles } = req.body;
            const { id } = req.decodedToken;

            const response = await MenuService.create({ name, key, roles, createdBy : new mongoose.Types.ObjectId(id) });
            callback(null, response, 'dataInsert');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    }
}
