# FinanceTracker 

A modern, full-stack personal finance management application that helps you take control of your financial future with intelligent tracking, automated categorization, and powerful analytics.

![FinanceTracker Dashboard](https://img.shields.io/badge/Status-Active-green?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-2.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

##  Features

### **Landing Page**
- Modern dark theme with glassmorphism design
- Responsive navigation with smooth scrolling
- Interactive feature showcase
- User testimonials and benefits section
- Clean, professional UI/UX

### **Dashboard**
- Real-time financial overview
- Monthly income, expenses, and balance tracking
- Interactive charts and visualizations
- Recent transactions display
- Quick transaction management

### **Smart Analytics**
- AI-powered financial insights
- Spending pattern analysis
- Category-wise expense breakdown
- Trend analysis and forecasting
- Visual data representation with charts

### 📄 **Receipt Scanning**
- AI-powered OCR technology
- Automatic data extraction from receipts
- Smart categorization of expenses
- Drag-and-drop upload interface
- Support for various image formats

### 💳 **Transaction Management**
- Add, edit, and delete transactions
- Income and expense tracking
- Category-based organization
- Date and amount filtering
- Bulk operations support

### 🔐 **Authentication & Security**
- Secure user registration and login
- JWT-based authentication
- Password encryption with bcrypt
- Protected routes and API endpoints
- Session management

### ⚙️ **Settings & Customization**
- User profile management
- Notification preferences
- Data export/import options
- Currency settings (INR support)
- Theme customization

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form handling and validation
- **Recharts** - Data visualization library
- **Lucide React** - Modern icon library
- **Axios** - HTTP client for API calls

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### **AI & OCR**
- **Google Generative AI** - AI-powered insights
- **Tesseract.js** - OCR for receipt scanning
- **pdf-parse** - PDF text extraction

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/financetracker.git
   cd financetracker
   ```

2. **Backend Setup**
   ```bash
   cd personal-finance/backend
   npm install
   
   # Create environment file
   cp .env.example .env
   
   # Configure your environment variables
   # MongoDB connection string
   # JWT secret key
   # Google AI API key (optional)
   ```

3. **Frontend Setup**
   ```bash
   cd ../../frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/financetracker
   JWT_SECRET=your-super-secret-jwt-key
   GOOGLE_API_KEY=your-google-ai-api-key
   ```

5. **Start the Development Servers**
   
   Backend:
   ```bash
   cd personal-finance/backend
   npm run dev
   ```
   
   Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
financetracker/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Auth/        # Authentication components
│   │   │   ├── Dashboard/   # Dashboard widgets
│   │   │   ├── Layout/      # Layout components
│   │   │   └── Transactions/ # Transaction components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── context/         # React context providers
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript type definitions
│   └── public/              # Static assets
├── personal-finance/
│   └── backend/             # Express.js backend
│       ├── src/
│       │   ├── controllers/ # Request handlers
│       │   ├── models/      # Database models
│       │   ├── routes/      # API routes
│       │   ├── middleware/  # Custom middleware
│       │   ├── services/    # Business logic
│       │   └── config/      # Configuration files
│       └── uploads/         # File upload directory
└── README.md
```

## 🎨 Design Features

### **Dark Theme**
- Modern slate color palette
- Gradient backgrounds and borders
- Glassmorphism effects
- Consistent spacing and typography

### **Responsive Design**
- Mobile-first approach
- Breakpoint-based layouts
- Touch-friendly interactions
- Optimized for all screen sizes

### **Interactive Elements**
- Smooth animations and transitions
- Hover effects and micro-interactions
- Loading states and feedback
- Accessible components

## 📈 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### **Transactions**
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### **AI Services**
- `POST /api/ai/analyze` - Get financial insights
- `POST /api/ai/receipt` - Process receipt image

## 🔧 Configuration

### **Environment Variables**

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `GOOGLE_API_KEY` | Google AI API key | No |

### **Database Setup**
The application uses MongoDB with the following collections:
- `users` - User accounts and profiles
- `transactions` - Financial transactions
- `categories` - Expense categories

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

### **Backend (Heroku/Railway)**
```bash
cd personal-finance/backend
npm run build
# Deploy with environment variables configured
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Recharts** for beautiful data visualization
- **Tailwind CSS** for rapid UI development
- **Lucide React** for consistent iconography
- **Google AI** for intelligent insights
- **MongoDB** for flexible data storage

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ for better financial management**

*Take control of your financial future with FinanceTracker!*
