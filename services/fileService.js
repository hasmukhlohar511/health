const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class FileService {
    constructor() {
        this.uploadDir = path.join(__dirname, '../uploads');

        // Ensure the upload directory exists
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    async saveFile(file) {
        const fileExtension = path.extname(file.name);
        const fileName = `${uuidv4()}${fileExtension}`;
        const filePath = path.join(this.uploadDir, fileName);

        return new Promise((resolve, reject) => {
            file.mv(filePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(filePath);
                }
            });
        });
    }
}

module.exports = new FileService();
