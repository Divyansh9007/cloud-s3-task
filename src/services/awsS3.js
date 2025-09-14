// AWS S3 configuration
import AWS from "aws-sdk";

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION || "us-east-1",
});

// Create S3 service object
const s3 = new AWS.S3();

export const uploadFileToS3 = async (file, fileName) => {
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType: file.type,
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};

export const deleteFileFromS3 = async (fileName) => {
  const params = {
    Bucket: process.env.REACT_APP_S3_BUCKET_NAME,
    Key: fileName,
  };

  try {
    await s3.deleteObject(params).promise();
    return true;
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw error;
  }
};

export default s3;
