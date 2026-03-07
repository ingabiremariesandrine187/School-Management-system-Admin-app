# School Management System - Admin Backend

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/school_admin
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=24h
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new user
- `GET /api/auth/pending-verifications` - Get pending device verifications (Admin only)
- `PUT /api/auth/verify-device/:userId` - Verify user device (Admin only)

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/students/:id/grades` - Get student grades
- `GET /api/students/:id/attendance` - Get student attendance

### Transactions (Fee Management)
- `GET /api/transactions` - Get all transactions (Admin only)
- `GET /api/transactions/student/:studentId` - Get transactions by student
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id/approve` - Approve transaction (Admin only)
- `PUT /api/transactions/:id/reject` - Reject transaction (Admin only)

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get class by ID
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher by ID
- `POST /api/teachers` - Create new teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Security Features
- SHA-512 password hashing
- JWT authentication
- Device ID verification
- Rate limiting
- Helmet security headers
- Input validation and sanitization
- Role-based access control

## Architecture
- **Routes**: API endpoint definitions
- **Controllers**: Request handling logic
- **Services**: Business logic layer
- **Models**: Database schemas
- **Middlewares**: Authentication, validation, error handling
- **DTOs**: Data transformation objects
- **Config**: Database and environment configuration
