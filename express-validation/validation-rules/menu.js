module.exports = function (routeName, userLanguage, check, messages) {
    switch (routeName) {
        case 'getMenus':
            return [
                check("role").notEmpty().withMessage(messages[userLanguage].errorMessages.roleRequired)
                    .isIn(['AD', 'SAD', 'CR', 'HR', 'PA']).withMessage(messages[userLanguage].errorMessages.invalidRole),
            ];

        default:
            return [];
    }
}