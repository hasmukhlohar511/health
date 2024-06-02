const fs = require("fs");
const path = require('path');
const  { S3 } = require('../services/awsService');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    uploadFiles: async (req, res, callback) => {
        try { 
             // Handle the case for both single and multiple file uploads
            const files = Array.isArray(req.files.file) ? req.files.file : [req.files.file];

            const s3Service = new S3(process.env.AWS_S3_BUCKET, process.env.AWS_S3_URL);

            const response = [];

            const uploadPromises = files.map(async (file) => {
                const fileName = file.name;
                const fileBuffer = file.data;
                const fileKey = uuidv4();
    
                await s3Service.uploadFile(fileBuffer, fileKey);

                response.push({ fileName, fileKey });
            });
    
            await Promise.all(uploadPromises);
                                    
            callback(null, response, 'fileUploaded', 200);
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getSignedUrl : async (req, res, callback) => {
        const { fileKey } = req.body;
        try {
            
            const s3Service = new S3(process.env.AWS_S3_BUCKET, process.env.AWS_S3_URL);
            const fileUrl = await s3Service.getPreSignedURL(fileKey);

            callback(null, fileUrl, 'dataFofileFoundund', 200);
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    }
}