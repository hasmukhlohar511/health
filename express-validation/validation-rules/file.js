const { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } = require("../../utils/constants");

module.exports = function (routeName, userLanguage, check, messages) {
    switch (routeName) {
        case 'uploadFiles':
            return [
                check('file').custom((value, { req }) => {                
                    // Check if 'file' is present in the request
                    if (!req.files || !req.files.file) {
                        throw new Error(messages[userLanguage].errorMessages.fileRequired);
                    }
                
                    const files = Array.isArray(req.files.file) ? req.files.file : [req.files.file];
                
                    // Check if the file(s) type is allowed
                    files.forEach(file => {
                        console.log("file.mimetype",file, file.mimetype)
                        if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
                            throw new Error(messages[userLanguage].errorMessages.invalidFileType);
                        }
                    });
                
                    // Check if the file(s) size exceeds the maximum limit
                    files.forEach(file => {
                        if (file.size > MAX_FILE_SIZE) {
                            throw new Error(messages[userLanguage].errorMessages.invalidFileSize);
                        }
                    });
                
                    return true;
                })
            ];

        default:
            return [];
    }
}