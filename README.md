# 🎓 Cloud-Based University PYQ Repository

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Latest-orange.svg)](https://firebase.google.com/)
[![AWS S3](https://img.shields.io/badge/AWS-S3-yellow.svg)](https://aws.amazon.com/s3/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-green.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

A comprehensive **cloud-based web application** that revolutionizes how educational institutions manage and distribute Previous Year Question papers (PYQs). Built with modern technologies including **React.js**, **Firebase**, and **AWS S3** for scalable, secure, and efficient academic resource management.

## 🌟 **Live Demo**



## 📸 **Screenshots**

### Student Dashboard
![Student Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Student+Dashboard+-+Search+%26+Download+PYQs)

### Admin Dashboard  
![Admin Dashboard](https://via.placeholder.com/800x400/059669/FFFFFF?text=Admin+Dashboard+-+Upload+%26+Manage+PYQs)

### Authentication System
![Login Interface](https://via.placeholder.com/400x300/DC2626/FFFFFF?text=Secure+Login+System)

## ✨ **Key Features**

### 🔐 **Authentication & Authorization**
- **Multi-Role System**: Distinct Admin and Student roles with specific permissions
- **Secure Login/Registration**: Firebase Authentication with email verification
- **Protected Routes**: Role-based route protection and navigation guards
- **Session Management**: Persistent authentication state across browser sessions

### 📁 **Advanced File Management**
- **Secure Upload**: Direct-to-S3 upload with real-time progress tracking
- **Smart Organization**: Structured file hierarchy with metadata storage
- **Download Analytics**: Track resource usage and popular content
- **File Validation**: Comprehensive PDF validation and size restrictions

### 🔍 **Intelligent Search System**
- **Multi-Parameter Filtering**: Search by subject, year, semester, department
- **Real-Time Results**: Instant search with dynamic filtering
- **Advanced Sorting**: Sort by date, downloads, relevance
- **Tag-Based Discovery**: Smart categorization and tagging system

### 📱 **Responsive Design**
- **Mobile-First Approach**: Optimized for all device sizes
- **Modern UI/UX**: Clean, intuitive interface with Tailwind CSS
- **Dark Mode Ready**: Prepared for theme switching
- **Accessibility Compliant**: WCAG guidelines implementation

### � **Analytics & Reporting**
- **Usage Statistics**: Download counts and user engagement metrics
- **Admin Dashboard**: Comprehensive management and oversight tools
- **Real-Time Updates**: Live data synchronization across all users
- **Performance Monitoring**: System health and optimization insights

## 🏗️ **System Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT SIDE                            │
├─────────────────────────────────────────────────────────────┤
│  React.js Frontend (Port 3000)                             │
│  ├── Authentication Components (Login/Register)            │
│  ├── Admin Dashboard (Upload/Manage PYQs)                  │
│  ├── Student Interface (Search/Download)                   │
│  └── Common Components (Navbar/Footer)                     │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                   SERVICE LAYER                            │
├─────────────────────────────────────────────────────────────┤
│  ├── Firebase Authentication Service                       │
│  ├── Cloud Firestore Database Service                      │
│  ├── AWS S3 Storage Service                               │
│  └── React Context API (State Management)                  │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                 CLOUD INFRASTRUCTURE                       │
├─────────────────────────────────────────────────────────────┤
│  ├── 🔐 Firebase Auth (User Management)                    │
│  ├── 🗃️ Cloud Firestore (Metadata Storage)                │
│  ├── 📦 AWS S3 (File Storage - ap-south-1)               │
│  └── 🛡️ IAM Policies (Security & Access Control)          │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ **Technology Stack**

### **Frontend Development**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React.js** | 19.1.1 | UI Framework & Component Management |
| **React Router DOM** | 7.9.1 | Client-side Routing & Navigation |
| **Tailwind CSS** | 3.4.0 | Utility-first CSS Framework |
| **PostCSS** | Latest | CSS Processing & Optimization |

### **Backend & Cloud Services** 
| Service | Purpose | Region |
|---------|---------|---------|
| **Firebase Authentication** | User Management & Security | Global |
| **Cloud Firestore** | NoSQL Database for Metadata | asia-south1 |
| **AWS S3** | Scalable File Storage | ap-south-1 |
| **AWS IAM** | Access Control & Security Policies | Global |

### **Development Tools**
| Tool | Purpose |
|------|---------|
| **Create React App** | Project Bootstrapping |
| **VS Code** | Development Environment |
| **Git** | Version Control |
| **npm** | Package Management |

## 📋 **Prerequisites**

### **System Requirements**
- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v8.0.0 or higher (included with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### **Cloud Service Accounts**
- **🔥 Firebase Account**: [Create Account](https://firebase.google.com/)
- **☁️ AWS Account**: [Create Account](https://aws.amazon.com/)
- **💳 Payment Method**: For AWS (Free Tier Available)

## 🚀 **Installation & Setup**

### **1. Clone the Repository**

```bash
git clone https://github.com/Divyansh9007/cloud-s3-task.git
cd cloud-s3-task
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Configuration**

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

**Configure your environment variables:**

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# AWS Configuration
REACT_APP_AWS_ACCESS_KEY_ID=your_aws_access_key
REACT_APP_AWS_SECRET_ACCESS_KEY=your_aws_secret_key
REACT_APP_AWS_REGION=ap-south-1
REACT_APP_S3_BUCKET_NAME=your_bucket_name
```

### **4. Cloud Services Setup**

#### **🔥 Firebase Setup**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** with Email/Password
4. Enable **Firestore Database** in production mode
5. Get your config values from Project Settings

#### **☁️ AWS S3 Setup**
1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Create an S3 bucket in `ap-south-1` region
3. Configure bucket policy for public read access
4. Set up CORS configuration
5. Create IAM user with S3 access permissions

**📖 Detailed Setup Guide**: See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

### **5. Start Development Server**

```bash
npm start
```



---

## 📁 **Project Structure**

```
university-pyq-repository/
├── 📁 public/                     # Static assets
├── 📁 src/                        # Source code
│   ├── 📁 components/             # React components
│   │   ├── 📁 auth/               # Authentication components
│   │   │   ├── Login.js           # User login interface
│   │   │   └── Register.js        # User registration form
│   │   ├── 📁 admin/              # Admin-specific components
│   │   │   ├── AdminDashboard.js  # Admin overview & stats
│   │   │   ├── UploadPYQ.js       # File upload interface  
│   │   │   └── ManagePYQs.js      # PYQ management tools
│   │   ├── 📁 student/            # Student-specific components
│   │   │   └── StudentDashboard.js # Search & download interface
│   │   └── 📁 common/             # Shared components
│   │       └── Navbar.js          # Navigation component
│   ├── 📁 contexts/               # React Context providers
│   │   └── AuthContext.js         # Authentication state management
│   ├── 📁 services/               # Service layer
│   │   ├── firebase.js            # Firestore operations
│   │   ├── firebaseConfig.js      # Firebase configuration
│   │   └── awsS3.js              # AWS S3 operations
│   ├── App.js                     # Main application component
│   ├── index.js                   # Application entry point
│   └── index.css                  # Global styles
├── 📄 .env.example               # Environment variables template
├── 📄 .gitignore                 # Git ignore rules
├── 📄 package.json               # Dependencies & scripts
├── 📄 tailwind.config.js         # Tailwind CSS configuration
├── 📄 postcss.config.js          # PostCSS configuration
├── 📄 README.md                  # Project documentation
├── 📄 DEPLOYMENT_GUIDE.md        # Deployment instructions
├── 📄 INTEGRATION_GUIDE.md       # Cloud services setup guide
└── 📄 PROJECT_PRESENTATION.md    # Faculty presentation content
```

## 🎯 **Usage Guide**

### **👤 For Students**

1. **Register/Login** with your university email
2. **Browse PYQs** using the search and filter options
3. **Download** question papers directly to your device
4. **Track** your download history and favorite subjects

### **👨‍💼 For Administrators**

1. **Login** with admin credentials
2. **Upload PYQs** with comprehensive metadata
3. **Manage existing** question papers (edit/delete)
4. **View analytics** and usage statistics
5. **Monitor** system performance and user activity

## 🔧 **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm start` | 🚀 Start development server |
| `npm run build` | 🏗️ Build for production |
| `npm test` | 🧪 Run test suite |
| `npm run eject` | ⚙️ Eject from Create React App |

## 🔒 **Security Features**

- **🔐 Role-Based Authentication**: Secure user roles with Firebase Auth
- **🛡️ Protected Routes**: Route-level security implementation  
- **🔏 Input Validation**: Comprehensive form validation and sanitization
- **🌐 CORS Configuration**: Proper cross-origin resource sharing setup
- **🔑 Environment Variables**: Secure API key management
- **📝 Audit Trails**: Activity logging and monitoring

## 📊 **Database Schema**

### **👥 Users Collection (Firestore)**
```javascript
{
  uid: "firebase_user_id",
  email: "student@university.edu", 
  role: "student" | "admin",
  name: "User Full Name",
  createdAt: "2025-09-13T10:30:00Z",
  lastLogin: "2025-09-13T15:45:00Z"
}
```

### **📚 PYQs Collection (Firestore)**
```javascript
{
  id: "auto_generated_id",
  fileName: "subject_year_semester_timestamp.pdf",
  originalName: "Cloud Computing Final Exam 2024.pdf",
  subject: "Cloud Computing",
  year: 2024,
  semester: 7,
  university: "Delhi University",
  department: "Computer Science",
  uploadedBy: "admin_user_id",
  uploadedAt: "2025-09-13T12:00:00Z", 
  downloadCount: 156,
  s3Url: "https://bucket.s3.ap-south-1.amazonaws.com/pyqs/...",
  fileSize: 2048000,
  tags: ["final", "theory", "important"]
}
```

## 🚀 **Deployment**

### **🌐 Production Deployment**

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to Firebase Hosting**:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```

3. **Configure production environment**:
   - Set production Firebase config
   - Update AWS S3 bucket policies
   - Configure custom domain (optional)

**📖 Complete Deployment Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🤝 **Contributing**

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`) 
5. **Open** a Pull Request

### **📋 Contribution Guidelines**
- Follow React best practices
- Write clear commit messages  
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compliance

## 🐛 **Troubleshooting**

### **Common Issues**

**❌ Firebase Auth Error**
```bash
Solution: Check Firebase configuration in .env file
Verify: Authentication is enabled in Firebase console
```

**❌ AWS S3 Upload Failed**  
```bash
Solution: Verify AWS credentials and bucket permissions
Check: S3 bucket CORS configuration
```

**❌ Build Errors**
```bash
Solution: Clear node_modules and reinstall
Commands: rm -rf node_modules && npm install
```

**❌ CORS Errors**
```bash
Solution: Configure S3 bucket CORS policy
Check: Browser developer tools for specific errors
```

## 📈 **Performance Optimization**

- **🚀 Code Splitting**: Implemented with React.lazy()
- **📦 Bundle Analysis**: Use `npm run build --analyze`
- **🗃️ Caching**: Firebase and S3 caching strategies
- **📱 Mobile Optimization**: Responsive design with Tailwind
- **⚡ Lazy Loading**: Components and images loaded on demand

## 📞 **Support & Contact**

- **📧 Email**: [divyansh9007@gmail.com](mailto:divyansh9007@gmail.com)
- **💼 LinkedIn**: [Divyansh Profile](https://linkedin.com/in/divyansh9007)
- **🐛 Issues**: [GitHub Issues](https://github.com/Divyansh9007/cloud-s3-task/issues)
- **📖 Documentation**: Check the `/docs` folder for detailed guides

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **🔥 Firebase Team** for excellent cloud services
- **☁️ AWS** for reliable cloud infrastructure  
- **⚛️ React.js Community** for the amazing framework
- **🎨 Tailwind CSS** for the utility-first CSS framework
- **🎓 University Faculty** for project guidance and support

---

## 📊 **Project Statistics**

![GitHub repo size](https://img.shields.io/github/repo-size/Divyansh9007/cloud-s3-task)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Divyansh9007/cloud-s3-task)
![GitHub top language](https://img.shields.io/github/languages/top/Divyansh9007/cloud-s3-task)
![GitHub last commit](https://img.shields.io/github/last-commit/Divyansh9007/cloud-s3-task)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

**🔄 Fork it to customize for your institution**

**🐛 Report issues to help us improve**

</div>

---

*Made with ❤️ by [Divyansh](https://github.com/Divyansh9007) for the Cloud Computing course*

The application will be available at `http://localhost:3000`

## ⚙️ Configuration Guide

### Firebase Setup

1. **Create a Firebase Project**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Follow the setup wizard

2. **Enable Authentication**

   - In Firebase Console, go to Authentication > Sign-in method
   - Enable "Email/Password" provider

3. **Create Firestore Database**

   - Go to Firestore Database
   - Create database in test mode
   - Choose your preferred location

4. **Get Configuration**
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click on the web icon to add a web app
   - Copy the configuration values to your `.env` file

### AWS Setup

1. **Create AWS Account**

   - Sign up for AWS Free Tier at [aws.amazon.com](https://aws.amazon.com/)

2. **Create S3 Bucket**

   - Go to S3 service
   - Click "Create bucket"
   - Choose a unique bucket name
   - Select region (us-east-1 recommended)
   - Configure public access settings

3. **Create IAM User**
   - Go to IAM service
   - Create new user with programmatic access
   - Attach S3 permissions
   - Save the Access Key ID and Secret Access Key

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/           # Login and Registration
│   ├── admin/          # Admin Dashboard and Features
│   ├── student/        # Student Dashboard
│   └── common/         # Shared Components
├── contexts/           # React Context (Auth)
├── services/           # Firebase and AWS Services
└── utils/              # Utility Functions
```



## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify or Vercel

1. Connect your GitHub repository
2. Set environment variables in the deployment platform
3. Deploy from the `build` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

