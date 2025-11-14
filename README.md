# 🚀 Reviewly - Professional Store Rating Platform

<div align="center">

![Reviewly](https://img.shields.io/badge/Reviewly-Store%20Rating%20Platform-6366f1?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)

**A modern, full-stack web application for store discovery, rating, and management with enterprise-grade features and professional UI/UX design.**

[Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [API Reference](#-api-reference)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Reviewly** is a comprehensive store rating platform that enables users to discover, rate, and review stores while providing powerful management tools for store owners and system administrators. Built with modern web technologies, it features a beautiful dark-themed UI with space-inspired design elements, role-based access control, and real-time analytics.

### Key Highlights

- ✨ **Modern UI/UX**: Dark space-themed design with glassmorphism effects and smooth animations
- 🔐 **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- 👥 **Role-Based Access**: Three distinct user roles with tailored experiences
- 📊 **Real-Time Analytics**: Comprehensive dashboards with live metrics
- 🎨 **Responsive Design**: Mobile-first approach with perfect scaling across devices
- ⚡ **Performance Optimized**: Fast load times with Vite and optimized React components

---

## ✨ Features

### 🔐 Authentication & User Management

- **Secure Signup/Login**: Modern authentication forms with role selection
- **JWT Token Management**: Automatic token validation and refresh
- **Password Security**: Bcrypt hashing with strength requirements
- **Session Management**: Automatic logout on token expiration
- **Profile Management**: Update user information and passwords

### 👥 Role-Based Access Control

#### **System Administrator**
- Complete user and store management
- System-wide analytics and metrics
- Advanced filtering and sorting capabilities
- User detail views with comprehensive information
- Store assignment to owners

#### **Store Owner**
- Dashboard with store performance metrics
- View users who rated their stores
- Average rating calculations
- Store listing and management

#### **Normal User**
- Browse and search stores
- Submit and modify ratings (1-5 stars)
- View store details and ratings
- Personal rating history

### 🏪 Store Management

- **Store Directory**: Beautiful card-based layout with search and filtering
- **Rating System**: 1-5 star ratings with average calculations
- **Store Assignment**: Admins can assign stores to Store Owners
- **Advanced Search**: Filter by name, address, and owner
- **Sorting**: Multiple sort options for better organization

### 📊 Analytics & Dashboards

- **Role-Specific Dashboards**: Tailored experiences for each user type
- **Real-Time Statistics**: Live data updates and performance metrics
- **Data Tables**: Sortable, filterable tables with modern styling
- **Visual Metrics**: Color-coded statistics and performance indicators

### 🎨 User Experience

- **Modern Navigation**: Professional sidebar and navbar with glassmorphism
- **Responsive Design**: Perfect experience across all devices
- **Loading States**: Professional spinners and feedback
- **Error Handling**: Comprehensive error messages and user feedback
- **Accessibility**: ARIA labels and semantic HTML structure

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (v16.x+)
- **Framework**: [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- **Database**: [MySQL](https://www.mysql.com/) - Relational database management
- **ORM**: [MySQL2](https://github.com/sidorares/node-mysql2) - MySQL client for Node.js
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) - Secure token-based auth
- **Security**: [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - Password hashing
- **Middleware**: [CORS](https://github.com/expressjs/cors) - Cross-origin resource sharing

### Frontend
- **Library**: [React](https://reactjs.org/) (v18.x) - UI library
- **UI Framework**: [Material-UI (MUI)](https://mui.com/) - Professional component library
- **Routing**: [React Router](https://reactrouter.com/) - Client-side routing
- **HTTP Client**: [Axios](https://axios-http.com/) - Promise-based HTTP client
- **Build Tool**: [Vite](https://vitejs.dev/) - Next-generation frontend tooling
- **Typography**: [Inter Font](https://fonts.google.com/specimen/Inter) - Professional typeface

### Development Tools
- **Linting**: [ESLint](https://eslint.org/) - Code quality and consistency
- **Version Control**: [Git](https://git-scm.com/) - Distributed version control
- **Package Manager**: [npm](https://www.npmjs.com/) - Node package manager

---

## 📁 Project Structure

```
Reviewly/
├── backend/                    # Backend application
│   ├── config/                # Configuration files
│   │   └── db.js             # Database connection
│   ├── controllers/           # Request handlers
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── ratingController.js
│   │   └── userStoreController.js
│   ├── database/              # Database scripts
│   │   ├── create_database.sql
│   │   └── create_admin_user.sql
│   ├── middleware/            # Express middleware
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/                # Data models
│   │   ├── ratingModel.js
│   │   ├── storeModel.js
│   │   └── userModel.js
│   ├── routes/                # API routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── ratingRoutes.js
│   │   └── userStoreRoutes.js
│   ├── utils/                 # Utility functions
│   │   ├── jwtUtils.js
│   │   ├── passwordUtils.js
│   │   └── ratingUtils.js
│   ├── app.js                 # Express application entry
│   └── package.json           # Backend dependencies
│
├── frontend/                   # Frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Auth/         # Authentication components
│   │   │   ├── Common/       # Shared components
│   │   │   ├── Nav/          # Navigation components
│   │   │   ├── Table/        # Data table components
│   │   │   └── User/         # User-related components
│   │   ├── context/          # React context providers
│   │   │   └── AuthContext.jsx
│   │   ├── layouts/          # Layout components
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── GuestLayout.jsx
│   │   │   └── UserLayout.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Admin/        # Admin pages
│   │   │   ├── Auth/         # Auth pages
│   │   │   ├── StoreOwner/   # Owner pages
│   │   │   └── User/         # User pages
│   │   ├── routes/           # Route configuration
│   │   │   └── AppRoutes.jsx
│   │   ├── services/         # API service functions
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── ratingService.js
│   │   │   ├── storeService.js
│   │   │   └── userService.js
│   │   ├── theme/            # Theme configuration
│   │   │   └── theme.js
│   │   ├── utils/            # Utility functions
│   │   │   ├── localStorage.js
│   │   │   └── validation.js
│   │   ├── App.jsx           # Root component
│   │   └── main.jsx          # Application entry
│   ├── index.html            # HTML template
│   └── package.json          # Frontend dependencies
│
└── README.md                  # Project documentation
```

---

## 🚀 Installation

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v16.x or later) - [Download](https://nodejs.org/en/download/)
- **npm** (comes with Node.js) - [Documentation](https://www.npmjs.com/get-npm)
- **MySQL Server** (v8.0 or later) - [Download](https://dev.mysql.com/downloads/mysql/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/AmanInGitDev/Reviewly.git
cd Reviewly
```

### Step 2: Database Setup

#### 2.1 Start MySQL Service

**macOS (Homebrew):**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
```

**Windows:**
Start MySQL from Services or use MySQL Workbench.

#### 2.2 Create Database and Tables

```bash
# Navigate to database scripts
cd backend/database

# Run the database creation script
mysql -u root -p < create_database.sql
```

This will create:
- Database: `platformDB`
- Tables: `users`, `stores`, `ratings`

#### 2.3 (Optional) Create Default Admin User

```bash
# Run the admin user creation script
mysql -u root -p < create_admin_user.sql
```

**Default Admin Credentials:**
- Email: `admin@example.com`
- Password: `Admin@123`

> **⚠️ Security Note**: Change the default admin password immediately after first login in production environments.

### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env  # If you have an example file
# Or create .env manually (see Configuration section)
```

### Step 4: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=platformDB

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters
```

#### Generating JWT Secret

You can generate a secure JWT secret using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend Configuration

The frontend is configured to connect to `http://localhost:3000/api` by default. To change this, update the `baseURL` in `frontend/src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Change this for production
  // ...
});
```

---

## 🏃 Running the Application

### Development Mode

You need to run both backend and frontend servers in separate terminal windows.

#### Terminal 1: Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:3000` (or the port specified in your `.env` file).

#### Terminal 2: Frontend Development Server

```bash
cd frontend
npm run dev
```

The React application will open in your browser at `http://localhost:5173` (Vite default port).

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

The production build will be in the `frontend/dist/` directory.

#### Serve Frontend (Production)

You can serve the built files using any static file server:

```bash
# Using serve
npx serve -s dist

# Using http-server
npx http-server dist

# Or deploy to a hosting service (Vercel, Netlify, etc.)
```

---

## 📡 API Reference

All API endpoints are prefixed with `/api`.

### Authentication Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `POST` | `/auth/signup` | ❌ | Register a new user |
| `POST` | `/auth/login` | ❌ | Authenticate and receive JWT token |
| `POST` | `/auth/logout` | ✅ | Logout and invalidate token |
| `GET` | `/auth/profile` | ✅ | Get current user profile |
| `PUT` | `/auth/password` | ✅ | Update user password |

### Store Endpoints

| Method | Endpoint | Auth Required | Role Required | Description |
|--------|----------|---------------|---------------|-------------|
| `GET` | `/stores` | ❌ | - | Get all stores (with search/sort) |
| `POST` | `/stores/:storeId/rate` | ✅ | Normal User | Submit/update store rating |

### Admin Endpoints

| Method | Endpoint | Auth Required | Role Required | Description |
|--------|----------|---------------|---------------|-------------|
| `GET` | `/admin/dashboard` | ✅ | System Administrator | Get system metrics |
| `GET` | `/admin/users` | ✅ | System Administrator | Get all users (with filters) |
| `POST` | `/admin/users` | ✅ | System Administrator | Create new user |
| `PUT` | `/admin/users/:id` | ✅ | System Administrator | Update user |
| `DELETE` | `/admin/users/:id` | ✅ | System Administrator | Delete user |
| `GET` | `/admin/stores` | ✅ | System Administrator | Get all stores (with filters) |
| `POST` | `/admin/stores` | ✅ | System Administrator | Create new store |
| `PUT` | `/admin/stores/:id` | ✅ | System Administrator | Update store |
| `DELETE` | `/admin/stores/:id` | ✅ | System Administrator | Delete store |

### Store Owner Endpoints

| Method | Endpoint | Auth Required | Role Required | Description |
|--------|----------|---------------|---------------|-------------|
| `GET` | `/store-owner/dashboard` | ✅ | Store Owner | Get owner dashboard data |

### Request/Response Examples

#### Login Request
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Login Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "Normal User"
  }
}
```

#### Rate Store Request
```json
POST /api/stores/1/rate
{
  "rating": 5
}
```

---

## 🗄️ Database Schema

### Users Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | User ID |
| `name` | VARCHAR(60) | NOT NULL | User full name |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| `password` | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| `address` | VARCHAR(400) | NULL | User address |
| `role` | ENUM | NOT NULL, DEFAULT 'Normal User' | User role |

**Roles**: `'System Administrator'`, `'Normal User'`, `'Store Owner'`

### Stores Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Store ID |
| `name` | VARCHAR(60) | UNIQUE, NOT NULL | Store name |
| `address` | VARCHAR(400) | NOT NULL | Store address |
| `owner_id` | INT | FOREIGN KEY, NULL | Reference to users.id |

### Ratings Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Rating ID |
| `user_id` | INT | FOREIGN KEY, NOT NULL | Reference to users.id |
| `store_id` | INT | FOREIGN KEY, NOT NULL | Reference to stores.id |
| `rating` | INT | NOT NULL, CHECK (1-5) | Rating value (1-5 stars) |

**Unique Constraint**: `(user_id, store_id)` - One rating per user per store

---

## 🚢 Deployment

### Quick Deployment Options

#### Backend Deployment

**Recommended Platforms:**
- [Render](https://render.com/) - Easy PostgreSQL/MySQL setup
- [Railway](https://railway.app/) - Simple deployment with database
- [Heroku](https://www.heroku.com/) - Classic PaaS option
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

**Key Steps:**
1. Set environment variables in platform dashboard
2. Connect to managed MySQL database
3. Run database migration scripts
4. Deploy backend code

#### Frontend Deployment

**Recommended Platforms:**
- [Vercel](https://vercel.com/) - Optimized for React
- [Netlify](https://www.netlify.com/) - Easy static hosting
- [GitHub Pages](https://pages.github.com/) - Free hosting

**Key Steps:**
1. Build frontend: `npm run build`
2. Update API base URL for production
3. Deploy `dist/` folder to hosting service

### Environment Variables for Production

Ensure all environment variables are set in your hosting platform:

```env
PORT=3000
DB_HOST=your_production_db_host
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
DB_NAME=your_production_db_name
JWT_SECRET=your_production_jwt_secret
```

### Database Migration

For production, run the database scripts on your production database:

```bash
mysql -h your_host -u your_user -p your_database < backend/database/create_database.sql
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Role-based access control
- [ ] Store browsing and search
- [ ] Rating submission and updates
- [ ] Admin user management
- [ ] Admin store management
- [ ] Store owner dashboard
- [ ] Profile updates
- [ ] Password changes

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow ESLint configuration
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent formatting

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Aman Momin**

- GitHub: [@AmanInGitDev](https://github.com/AmanInGitDev)
- Project: [Reviewly](https://github.com/AmanInGitDev/Reviewly)

---

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the excellent component library
- [React](https://reactjs.org/) team for the amazing framework
- [Express.js](https://expressjs.com/) for the robust backend framework
- All contributors and users of this project

---

<div align="center">

**Made with ❤️ by Aman Momin**

⭐ Star this repo if you find it helpful!

</div>
