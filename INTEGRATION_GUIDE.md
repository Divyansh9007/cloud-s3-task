# Firebase and AWS Integration Guide

This guide provides detailed steps for integrating Firebase and AWS services with your University PYQ Repository application.

## 🔥 Firebase Integration

### Step 1: Create Firebase Project

1. **Go to Firebase Console**

   - Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Sign in with your Google account
   - Click "Create a project"

2. **Project Setup**
   - Enter project name: `university-pyq-repository`
   - Choose whether to enable Google Analytics (optional)
   - Select your analytics account (if enabled)
   - Click "Create project"

### Step 2: Configure Authentication

1. **Enable Authentication**

   - In the Firebase console, click "Authentication" in the left sidebar
   - Go to "Sign-in method" tab
   - Click on "Email/Password"
   - Enable "Email/Password" provider
   - Click "Save"

2. **Set Authorized Domains**
   - In Authentication > Settings > Authorized domains
   - Add your development domain: `localhost`
   - Add your production domain when you deploy

### Step 3: Setup Firestore Database

1. **Create Firestore Database**

   - Click "Firestore Database" in the left sidebar
   - Click "Create database"
   - Choose "Start in test mode" for development
   - Select your preferred location (choose closest to your users)
   - Click "Done"

2. **Configure Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can read their own user document
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }

       // Only authenticated users can read PYQs
       match /pyqs/{document} {
         allow read: if request.auth != null;
         allow write: if request.auth != null &&
           get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
       }
     }
   }
   ```

### Step 4: Get Firebase Configuration

1. **Add Web App**

   - Click on the gear icon (Project Settings)
   - Scroll down to "Your apps" section
   - Click the web icon `</>`
   - Enter app nickname: `university-pyq-repository`
   - Don't check "Also set up Firebase Hosting"
   - Click "Register app"

2. **Copy Configuration**
   - Copy the configuration object
   - Add these values to your `.env` file:
   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```

## ☁️ AWS Integration

### Step 1: Create AWS Account

1. **Sign Up for AWS**
   - Go to [https://aws.amazon.com/](https://aws.amazon.com/)
   - Click "Create an AWS Account"
   - Follow the registration process
   - **Important**: Choose the Free Tier to avoid charges

### Step 2: Create S3 Bucket

1. **Navigate to S3**

   - In AWS Console, search for "S3"
   - Click on "S3" service

2. **Create Bucket**

   - Click "Create bucket"
   - Enter bucket name: `university-pyq-repository-[your-unique-id]`
   - Choose AWS Region: `US East (N. Virginia) us-east-1` (recommended for free tier)
   - **Important**: Uncheck "Block all public access" (we need public read access for PDFs)
   - Check the acknowledgment box
   - Click "Create bucket"

3. **Configure Bucket Policy**

   - Click on your bucket name
   - Go to "Permissions" tab
   - Scroll down to "Bucket policy"
   - Click "Edit" and paste this policy:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

   - Replace `your-bucket-name` with your actual bucket name
   - Click "Save changes"

4. **Configure CORS**
   - In the same "Permissions" tab
   - Scroll to "Cross-origin resource sharing (CORS)"
   - Click "Edit" and paste:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```
   - Click "Save changes"

### Step 3: Create IAM User

1. **Navigate to IAM**

   - In AWS Console, search for "IAM"
   - Click on "IAM" service

2. **Create User**

   - Click "Users" in the left sidebar
   - Click "Add users"
   - Enter username: `university-pyq-app-user`
   - Select "Access key - Programmatic access"
   - Click "Next: Permissions"

3. **Set Permissions**

   - Choose "Attach existing policies directly"
   - Search for `AmazonS3FullAccess`
   - Check the box next to it
   - Click "Next: Tags" (skip this step)
   - Click "Next: Review"
   - Click "Create user"

4. **Save Credentials**
   - **IMPORTANT**: Download the CSV file or copy the credentials
   - Add to your `.env` file:
   ```env
   REACT_APP_AWS_ACCESS_KEY_ID=your-access-key-id
   REACT_APP_AWS_SECRET_ACCESS_KEY=your-secret-access-key
   REACT_APP_AWS_REGION=us-east-1
   REACT_APP_S3_BUCKET_NAME=your-bucket-name
   ```

### Step 4: Custom IAM Policy (Advanced - Optional)

For better security, create a custom policy instead of using `AmazonS3FullAccess`:

1. **Create Custom Policy**

   - In IAM, click "Policies" in the left sidebar
   - Click "Create policy"
   - Click "JSON" tab
   - Paste this policy:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       },
       {
         "Effect": "Allow",
         "Action": "s3:ListBucket",
         "Resource": "arn:aws:s3:::your-bucket-name"
       }
     ]
   }
   ```

   - Replace `your-bucket-name` with your actual bucket name
   - Click "Next: Tags"
   - Click "Next: Review"
   - Enter policy name: `UniversityPYQS3Policy`
   - Click "Create policy"

2. **Attach to User**
   - Go back to Users > your-user
   - Click "Add permissions"
   - Choose "Attach existing policies directly"
   - Search for your custom policy
   - Attach it and remove the full access policy

## 🧪 Testing the Integration

### Test Firebase

1. **Start your application**

   ```bash
   npm start
   ```

2. **Test Registration**

   - Go to `http://localhost:3000/register`
   - Register with an email and password
   - Check Firebase Console > Authentication to see the user

3. **Test Database**
   - Check Firebase Console > Firestore Database
   - You should see a `users` collection with your user data

### Test AWS S3

1. **Test File Upload**

   - Login as an admin user
   - Go to Upload PYQ page
   - Try uploading a PDF file
   - Check your S3 bucket to see if the file appears

2. **Test File Access**
   - The file should be publicly accessible via its S3 URL
   - Students should be able to download the file

## 🔒 Security Best Practices

### Firebase Security

1. **Firestore Rules**

   - Always use proper security rules
   - Never leave database in test mode for production

2. **Environment Variables**
   - Keep Firebase config in environment variables
   - Don't commit sensitive keys to version control

### AWS Security

1. **IAM Principles**

   - Use principle of least privilege
   - Create specific policies instead of using full access
   - Regularly rotate access keys

2. **S3 Security**
   - Only allow public read access, not write
   - Use bucket policies to restrict access
   - Monitor usage and costs

## 🚨 Troubleshooting

### Common Firebase Issues

1. **Authentication not working**

   - Check if Email/Password provider is enabled
   - Verify Firebase config in `.env` file
   - Check browser console for errors

2. **Database permission denied**
   - Verify Firestore security rules
   - Ensure user is authenticated
   - Check user role in database

### Common AWS Issues

1. **File upload fails**

   - Check AWS credentials in `.env` file
   - Verify IAM user has S3 permissions
   - Check bucket policy allows uploads

2. **Files not accessible**

   - Verify bucket policy allows public read
   - Check CORS configuration
   - Ensure bucket name is correct

3. **Access denied errors**
   - Check IAM policy has correct permissions
   - Verify AWS region matches bucket region
   - Ensure access keys are not expired

## 💰 Cost Management

### Firebase (Free Tier Limits)

- **Authentication**: 10,000 sign-in operations/month
- **Firestore**: 1 GiB storage, 50,000 reads, 20,000 writes/day

### AWS Free Tier (First 12 months)

- **S3**: 5 GB storage, 20,000 Get requests, 2,000 Put requests/month
- **Data Transfer**: 15 GB/month

### Tips to Stay Within Free Tier

1. Monitor usage in AWS Billing Dashboard
2. Set up billing alerts
3. Use Firebase Analytics to track app usage
4. Optimize file sizes to reduce storage costs

---

For more detailed information, refer to:

- [Firebase Documentation](https://firebase.google.com/docs)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS IAM Documentation](https://docs.aws.amazon.com/iam/)
