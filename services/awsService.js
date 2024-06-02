const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

class S3 {

  constructor(bucket, url) {
    this.bucket = bucket;
    this.url = url;
    this.s3Client = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    });
  }

  async uploadFile(fileBuffer, fileKey) {
    const params = {
      Bucket: this.bucket,
      Key: `Healthoptions/Healthoptions-Staging/${fileKey}`,
      Body: fileBuffer
    };

    const command = new PutObjectCommand(params);

    try {
      await this.s3Client.send(command);
      return { url: `${this.url}/${fileKey}`, key: fileKey };
    } catch (err) {
      throw new Error(`Error uploading file: ${err.message}`);
    }
  }

  async getPreSignedURL(fileKey, fileExpiry = 300) {
    const params = {
      Bucket: this.bucket,
      Key: `Healthoptions/Healthoptions-Staging/${fileKey}`,
      Expires: fileExpiry, 
    };
    const command = new GetObjectCommand(params);

    try {
      const url = await getSignedUrl(this.s3Client, command, { expiresIn: 300 });
      return { url };
    } catch (err) {
      throw new Error(`Error generating presigned URL: ${err.message}`);
    }
  }
}
module.exports = { S3 }
