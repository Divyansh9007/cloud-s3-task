# Deployment Guide

This guide covers different deployment options for your University PYQ Repository application.

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)

### Option 2: Vercel

### Option 3: Firebase Hosting

### Option 4: AWS Amplify

---

## 🌐 Option 1: Netlify Deployment

### Prerequisites

- GitHub account
- Netlify account (free)
- Your code pushed to GitHub repository

### Steps

1. **Build the Project Locally (Optional Test)**

   ```bash
   npm run build
   ```

2. **Connect to Netlify**

   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your repository

3. **Configure Build Settings**

   - Branch to deploy: `main` or `master`
   - Build command: `npm run build`
   - Publish directory: `build`

4. **Add Environment Variables**

   - Go to Site settings > Environment variables
   - Add all your environment variables:

   ```
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   REACT_APP_AWS_ACCESS_KEY_ID=your-aws-access-key-id
   REACT_APP_AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
   REACT_APP_AWS_REGION=us-east-1
   REACT_APP_S3_BUCKET_NAME=your-s3-bucket-name
   ```

5. **Deploy**

   - Click "Deploy site"
   - Wait for deployment to complete
   - Your site will be available at a random Netlify URL

6. **Custom Domain (Optional)**
   - Go to Domain settings
   - Add your custom domain
   - Update DNS records as instructed

---

## ⚡ Option 2: Vercel Deployment

### Prerequisites

- GitHub account
- Vercel account (free)

### Steps

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy from Repository**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure project settings:
     - Framework Preset: Create React App
     - Build Command: `npm run build`
     - Output Directory: `build`

4. **Add Environment Variables**

   - In Vercel dashboard, go to Settings > Environment Variables
   - Add all your environment variables (same as Netlify list above)

5. **Deploy**
   - Click "Deploy"
   - Your site will be available at a Vercel URL

---

## 🔥 Option 3: Firebase Hosting

### Prerequisites

- Firebase CLI installed
- Firebase project already created

### Steps

1. **Install Firebase CLI**

   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**

   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**

   ```bash
   firebase init hosting
   ```

   - Select your Firebase project
   - Set public directory as `build`
   - Configure as single-page app: Yes
   - Set up automatic builds with GitHub: Optional

4. **Build the Project**

   ```bash
   npm run build
   ```

5. **Deploy**

   ```bash
   firebase deploy --only hosting
   ```

6. **Custom Domain (Optional)**
   ```bash
   firebase hosting:channel:deploy production --expires 1h
   ```

---

## 📦 Option 4: AWS Amplify

### Prerequisites

- AWS account
- AWS CLI configured

### Steps

1. **Install Amplify CLI**

   ```bash
   npm install -g @aws-amplify/cli
   ```

2. **Configure Amplify**

   ```bash
   amplify configure
   ```

3. **Initialize Amplify**

   ```bash
   amplify init
   ```

4. **Add Hosting**

   ```bash
   amplify add hosting
   ```

   - Choose Amazon CloudFront and S3

5. **Deploy**
   ```bash
   amplify publish
   ```

---

## 🔧 Post-Deployment Configuration

### Update Firebase Authorized Domains

1. **Add Your Domain to Firebase**
   - Go to Firebase Console > Authentication > Settings
   - Add your deployment domain to "Authorized domains"
   - Examples:
     - `your-app.netlify.app`
     - `your-app.vercel.app`
     - `your-project.web.app` (Firebase)

### Update AWS CORS Policy

1. **Update S3 CORS Configuration**
   - Go to S3 Console > Your bucket > Permissions > CORS
   - Update AllowedOrigins to include your domain:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": [
         "http://localhost:3000",
         "https://your-app.netlify.app",
         "https://your-app.vercel.app"
       ],
       "ExposeHeaders": []
     }
   ]
   ```

---

## 🔍 Testing Your Deployment

### Functionality Checklist

- [ ] **Authentication**

  - [ ] User registration works
  - [ ] User login works
  - [ ] Role-based access control works
  - [ ] Logout works

- [ ] **Admin Features**

  - [ ] Can upload PYQ files
  - [ ] Files appear in S3 bucket
  - [ ] Metadata saves to Firestore
  - [ ] Can view and manage uploaded PYQs
  - [ ] Can delete PYQs

- [ ] **Student Features**

  - [ ] Can view all PYQs
  - [ ] Search functionality works
  - [ ] Filters work (year, semester, exam type)
  - [ ] Can download PYQ files
  - [ ] Download counter increases

- [ ] **General**
  - [ ] Responsive design works on mobile
  - [ ] No console errors
  - [ ] Loading states work properly
  - [ ] Error handling works

---

## 🚨 Troubleshooting Deployment Issues

### Common Issues and Solutions

#### 1. Build Fails

```bash
# Check for TypeScript errors
npm run build

# Fix common issues:
# - Unused variables (add // eslint-disable-next-line)
# - Missing dependencies (check package.json)
# - Environment variables not set
```

#### 2. Authentication Not Working

- Verify Firebase config environment variables
- Check authorized domains in Firebase console
- Ensure HTTPS is used in production

#### 3. File Upload Fails

- Check AWS credentials in environment variables
- Verify CORS configuration in S3 bucket
- Check IAM user permissions

#### 4. Files Not Accessible

- Verify S3 bucket policy allows public read
- Check file URLs are correct
- Ensure bucket region matches configuration

#### 5. Environment Variables Not Loading

```javascript
// Add this to debug environment variables
console.log("Environment check:", {
  firebase: !!process.env.REACT_APP_FIREBASE_API_KEY,
  aws: !!process.env.REACT_APP_AWS_ACCESS_KEY_ID,
});
```

### Performance Optimization

#### 1. Code Splitting

```javascript
// Implement lazy loading for better performance
import { lazy, Suspense } from "react";

const AdminDashboard = lazy(() => import("../admin/AdminDashboard"));
const StudentDashboard = lazy(() => import("../student/StudentDashboard"));

// Wrap components in Suspense
<Suspense fallback={<div>Loading...</div>}>
  <AdminDashboard />
</Suspense>;
```

#### 2. Image Optimization

- Use WebP format for images
- Implement lazy loading for images
- Compress images before deployment

#### 3. Bundle Analysis

```bash
# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

---

## 🔒 Security Considerations for Production

### Environment Variables

- Never commit `.env` files to version control
- Use different environment files for different stages
- Rotate AWS access keys regularly

### Firebase Security

- Implement proper Firestore security rules
- Enable App Check for additional security
- Monitor authentication usage

### AWS Security

- Use IAM roles instead of access keys when possible
- Implement bucket policies to restrict access
- Enable CloudTrail for audit logging

### HTTPS

- Always use HTTPS in production
- Implement HSTS headers
- Use secure cookies

---

## 📊 Monitoring and Analytics

### Firebase Analytics

```javascript
// Add to your main App component
import { getAnalytics } from "firebase/analytics";
import { app } from "./services/firebase";

const analytics = getAnalytics(app);
```

### Error Monitoring

Consider integrating:

- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user behavior

### Performance Monitoring

```javascript
// Add Firebase Performance Monitoring
import { getPerformance } from "firebase/performance";

const perf = getPerformance(app);
```

---

## 🎉 Go Live Checklist

Before announcing your application:

- [ ] All features tested and working
- [ ] Security rules implemented
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Error monitoring set up
- [ ] Backup strategy in place
- [ ] User documentation ready
- [ ] Support contact information added

---

## 📞 Support and Maintenance

### Regular Maintenance Tasks

- Monitor AWS costs and usage
- Update dependencies regularly
- Review and update security rules
- Backup Firestore data
- Monitor application performance

### Scaling Considerations

- Firebase has generous free tiers but monitor usage
- AWS S3 costs scale with storage and transfers
- Consider implementing caching for better performance
- Monitor and optimize database queries

---

For additional help:

- Check deployment platform documentation
- Review Firebase and AWS documentation
- Create issues in your repository for specific problems
