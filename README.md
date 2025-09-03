# EasyGenerator Auth

A full-stack authentication system built with React (frontend) and NestJS (backend), featuring user registration, login, JWT authentication, and protected routes.

## 🚀 Features

- **User Authentication**: Sign up, sign in, and logout functionality
- **JWT Token Management**: Secure authentication with HTTP-only cookies
- **Protected Routes**: Frontend route protection based on authentication status
- **MongoDB Integration**: User data persistence with Mongoose
- **Swagger API Documentation**: Interactive API documentation
- **Form Validation**: Client and server-side validation
- **Responsive Design**: Modern UI with SCSS styling

## 🏗️ Architecture

- **Frontend**: React 19 + TypeScript + Vite + React Router
- **Backend**: NestJS + TypeScript + MongoDB + Mongoose
- **Authentication**: JWT tokens with HTTP-only cookies
- **Database**: MongoDB with Mongoose ODM
- **API Documentation**: Swagger/OpenAPI 3.0

## 📁 Project Structure

```
EasyGenerator-Auth/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API service functions
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── backend/                # Backend source code
│   ├── src/               # NestJS source code
│   │   ├── users/         # User management module
│   │   ├── mongo-db/      # Database configuration
│   │   └── utils/         # Utility functions
│   └── dist/              # Compiled JavaScript
└── public/                 # Static assets
```

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or cloud)
- Git

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/MohamedBattawy/EasyGenerator-Auth.git
cd EasyGenerator-Auth
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/easygenerator-auth
# or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/easygenerator-auth

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=30

# Server Configuration
PORT=3000
NODE_ENV=development

# Client Configuration
CLIENT_SERVER=http://localhost:5173
```

### 5. Start the Application

#### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run start:dev
```

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api

## 🔌 API Endpoints

### Authentication Endpoints

#### POST `/users/signup`
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "userId": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST `/users/signin`
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET `/users/me`
Get current authenticated user information.

**Headers:** Requires JWT token in cookies

**Response:**
```json
{
  "message": "User is authenticated",
  "user": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

#### POST `/users/logout`
Logout current user and clear JWT token.

**Headers:** Requires JWT token in cookies

**Response:**
```json
{
  "message": "User logged out successfully"
}
```

## 🔐 Authentication Flow

1. **Registration**: User creates account with email, name, and password
2. **Login**: User authenticates with email/password, receives JWT token
3. **Token Storage**: JWT token stored in HTTP-only cookie for security
4. **Protected Routes**: Frontend checks authentication status before rendering
5. **API Calls**: Backend validates JWT token for protected endpoints
6. **Logout**: Token cleared from cookies, user redirected to login

## 🗄️ Database Schema

### User Collection
```typescript
{
  _id: ObjectId,
  name: string,
  email: string (unique),
  password: string (hashed)
}
```

## 📚 API Documentation

The API is fully documented using Swagger/OpenAPI 3.0. Access the interactive documentation at:

**http://localhost:3000/api**
