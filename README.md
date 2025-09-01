# Finance Tracker



https://github.com/user-attachments/assets/88d83147-8e73-4dfb-a527-c487971fb9f7



A modern, full-stack personal finance management application built with React, TypeScript, and Node.js. Take control of your financial future with intelligent tracking, automated categorization, and powerful analytics.



## ✨ Features

### 🏠 **Core Functionality**
- **Real-time Dashboard** - Monitor income, expenses, and balance at a glance
- **Transaction Management** - Add, edit, delete, and categorize transactions
- **Smart Analytics** - Visual insights with interactive charts and graphs
- **Receipt Processing** - AI-powered PDF,Image(png,jpg) receipt scanning and data extraction
- **Multi-currency Support** - Indian Rupee (₹) formatting and calculations

### 🎨 **User Experience**
- **Modern Dark Theme** - Sleek glassmorphism design with gradient effects
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Fluid transitions and micro-interactions
- **Intuitive Navigation** - Clean, accessible interface with smooth scrolling

### 🔐 **Security & Authentication**
- **JWT Authentication** - Secure user registration and login
- **Password Encryption** - bcrypt hashing for maximum security
- **Protected Routes** - Authenticated-only access to sensitive data
- **Session Management** - Automatic token refresh and logout

### 📊 **Analytics & Insights**
- **Category Breakdown** - Pie charts showing expense distribution
- **Spending Trends** - Monthly income vs expenses visualization
- **Financial Goals** - Track savings and budget targets
- **Export Capabilities** - Download financial reports and data

## 🚀 Installation

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **MongoDB** (v4.4 or higher)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Kinnareash/Finance_Tracker.git
cd Finance_Tracker
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd personal-finance/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your environment variables in .env
# Add your MongoDB URI, JWT secret, etc.
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### 4. Environment Configuration

#### Backend (.env)
Create a `.env` file in the `personal-finance/backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/financetracker
JWT_SECRET=your-super-secret-jwt-key-here
GOOGLE_API_KEY=your-google-ai-api-key-optional
NODE_ENV=development
```

#### Frontend (.env)
Create a `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 5. Database Setup
```bash
# Start MongoDB service (varies by OS)
# For Windows (if installed as service):
net start MongoDB

# For macOS with Homebrew:
brew services start mongodb-community

# For Linux (systemd):
sudo systemctl start mongod
```

## 🎯 Usage

### Starting the Application

#### 1. Start Backend Server
```bash
cd personal-finance/backend
npm run dev
```
The backend will start on `http://localhost:5000`

#### 2. Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will start on `http://localhost:5173` (or next available port)

### 3. Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

### Basic Usage Examples

#### Register a New User
```bash
# Example API call for registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

#### Add a Transaction
```bash
# Example API call for adding transaction
curl -X POST http://localhost:5000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "type": "expense",
    "category": "Food",
    "amount": 250,
    "description": "Lunch at restaurant",
    "date": "2025-01-15"
  }'
```

#### Upload Receipt for Processing
```bash
# Example API call for receipt upload
curl -X POST http://localhost:5000/api/transactions/upload-receipt \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "receipt=@/path/to/receipt.pdf"
```

## 🛠️ Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI Library |
| **TypeScript** | 5.0+ | Type Safety |
| **Vite** | 5.4.8 | Build Tool |
| **Tailwind CSS** | 3.x | Styling |
| **React Router** | 7.8.2 | Routing |
| **React Hook Form** | 7.62.0 | Form Management |
| **Recharts** | 3.1.2 | Data Visualization |
| **Lucide React** | 0.344.0 | Icons |
| **Axios** | 1.11.0 | HTTP Client |

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 16+ | Runtime |
| **Express.js** | 5.1.0 | Web Framework |
| **TypeScript** | 5.0+ | Type Safety |
| **MongoDB** | 4.4+ | Database |
| **Mongoose** | 8.18.0 | ODM |
| **JWT** | 9.0.2 | Authentication |
| **bcrypt** | 6.0.0 | Password Hashing |
| **Multer** | 2.0.2 | File Uploads |
| **pdf-parse** | 1.1.1 | PDF Processing |

### **AI & Processing**
| Technology | Purpose |
|------------|---------|
| **Google Generative AI** | Financial Insights |
| **pdf-parse** | Receipt Text Extraction |

### **Development Tools**
| Tool | Purpose |
|------|---------|
| **ESLint** | Code Linting |
| **ts-node-dev** | Development Server |
| **CORS** | Cross-Origin Requests |
| **dotenv** | Environment Variables |

## 📂 Project Structure

```
Finance_Tracker/
├── 📁 frontend/                 # React TypeScript Frontend
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable UI Components
│   │   │   ├── 📁 Auth/         # Authentication Components
│   │   │   ├── 📁 Dashboard/    # Dashboard Widgets
│   │   │   ├── 📁 Layout/       # Layout Components
│   │   │   └── 📁 Transactions/ # Transaction Components
│   │   ├── 📁 pages/            # Page Components
│   │   ├── 📁 services/         # API Services
│   │   ├── 📁 context/          # React Context
│   │   ├── 📁 utils/            # Utility Functions
│   │   └── 📁 types/            # TypeScript Types
│   ├── 📄 package.json
│   └── 📄 vite.config.ts
├── 📁 personal-finance/
│   └── 📁 backend/              # Express.js Backend
│       ├── 📁 src/
│       │   ├── 📁 controllers/  # Request Handlers
│       │   ├── 📁 models/       # Database Models
│       │   ├── 📁 routes/       # API Routes
│       │   ├── 📁 middleware/   # Custom Middleware
│       │   ├── 📁 services/     # Business Logic
│       │   └── 📁 config/       # Configuration
│       ├── 📁 uploads/          # File Upload Directory
│       └── 📄 package.json
├── 📄 README.md
└── 📄 .gitignore
```

## 🔧 Configuration

### Environment Variables

#### Required Backend Variables
```env
MONGODB_URI=mongodb://localhost:27017/financetracker
JWT_SECRET=your-secret-key-minimum-32-characters
```

#### Optional Backend Variables
```env
PORT=5000
GOOGLE_API_KEY=your-google-ai-api-key
NODE_ENV=development
```

#### Frontend Variables
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Production Build

#### Frontend
```bash
cd frontend
npm run build
# Serve the dist/ folder with a static server
```

#### Backend
```bash
cd personal-finance/backend
npm run build
npm start
```

### Deployment Platforms

| Platform | Frontend | Backend |
|----------|----------|---------|
| **Vercel** | ✅ Recommended | ✅ Serverless |
| **Netlify** | ✅ Recommended | ❌ |
| **Heroku** | ✅ | ✅ Recommended |
| **Railway** | ✅ | ✅ |
| **DigitalOcean** | ✅ | ✅ |

## 🎯 Development Approach

This project was developed with a focus on modern web development practices and clean architecture:

### **Technical Decisions**
- **TypeScript** throughout for enhanced type safety and developer experience
- **React 18** with modern hooks and functional components
- **Tailwind CSS** for rapid, responsive UI development
- **MongoDB** for flexible data modeling and scalability
- **JWT Authentication** for secure, stateless user sessions

### **Code Quality Standards**
- Consistent ESLint configuration across frontend and backend
- Modular component architecture with reusable UI elements
- Clean separation of concerns with services, controllers, and models
- Responsive design patterns with mobile-first approach
- Error handling and user feedback throughout the application

### **Performance Optimizations**
- Vite for fast development and optimized production builds
- Lazy loading and code splitting for improved load times
- Efficient state management with React Context
- Optimized MongoDB queries and indexes
- Compressed assets and proper caching strategies

## 📄 License

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing UI library
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for the flexible NoSQL database
- **Recharts** for beautiful data visualization
- **Lucide** for the consistent icon library

## 📞 Contact

For questions about this project or technical discussions:

- 📧 **Developer**: [Your Email]
- 🐛 **Issues**: [GitHub Issues](https://github.com/Kinnareash/Finance_Tracker/issues)
- 📖 **Documentation**: [Project Wiki](https://github.com/Kinnareash/Finance_Tracker/wiki)

---

<div align="center">

**Finance Tracker - Personal Finance Management Solution**

*Developed as a comprehensive full-stack application demonstrating modern web development practices*

⭐ **Professional Portfolio Project** ⭐

</div>
