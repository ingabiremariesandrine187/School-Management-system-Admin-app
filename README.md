# School Management System - Admin Application

A comprehensive school management system with separate admin and client interfaces for managing students, teachers, classes, and fee payments.

## Project Structure

```
School_admin_app/
├── backend/          # Node.js/Express API
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Request handlers
│   │   ├── dtos/        # Data transfer objects
│   │   ├── middlewares/ # Auth, validation
│   │   ├── models/      # MongoDB schemas
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   └── server.js    # Entry point
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
└── frontend/         # React.js UI
    ├── public/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── services/    # API services
    │   ├── styles/      # CSS files
    │   ├── utils/       # Utilities
    │   ├── App.js
    │   └── index.js
    ├── .env.example
    ├── package.json
    └── README.md
```

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret

5. Start the server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

Frontend runs on `http://localhost:3000`

## Core Features

### Authentication & Security
- SHA-512 password hashing
- JWT authentication
- Device ID verification by admin
- Role-based access control (Admin, Teacher, Student, Parent)
- Rate limiting
- Helmet security headers
- Input validation and sanitization

### Admin Features
- Dashboard with statistics
- User device verification
- Student management (CRUD)
- Teacher management (CRUD)
- Class management (CRUD)
- Fee transaction approval/rejection
- View grades and attendance

### Fee Management
- Deposit (fee payment)
- Withdraw (refund request)
- Transaction history
- Balance tracking
- Admin approval workflow

### Academic Records
- Student grades
- Attendance tracking
- Class schedules
- Teacher assignments

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/auth/pending-verifications` - Get pending verifications
- `PUT /api/auth/verify-device/:userId` - Verify device

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id/approve` - Approve transaction
- `PUT /api/transactions/:id/reject` - Reject transaction

### Teachers
- `GET /api/teachers` - Get all teachers
- `POST /api/teachers` - Create teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Classes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Create class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

### Dashboard
- `GET /api/dashboard/stats` - Get statistics

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Helmet for security
- Express Rate Limit
- Express Validator

### Frontend
- React.js
- React Router DOM
- Axios
- CSS3

## Security Features
- Password hashing with SHA-512
- JWT token-based authentication
- Device verification system
- Protected API routes
- Rate limiting
- HTTP security headers
- Input validation and sanitization
- Role-based access control

## Architecture

### Backend Architecture
- **Routes**: Define API endpoints
- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Models**: Define database schemas
- **Middlewares**: Handle authentication, validation, errors
- **DTOs**: Transform data before sending to client
- **Config**: Database and environment configuration

### Frontend Architecture
- **Components**: Reusable UI components
- **Pages**: Full page components
- **Services**: API communication layer
- **Utils**: Helper functions and utilities
- **Styles**: Component-specific CSS

## Development Notes

- Backend uses layered architecture for maintainability
- DTOs ensure sensitive data is not exposed
- All routes are protected with authentication middleware
- Admin-only routes have additional authorization
- Frontend uses protected routes for authenticated pages
- Session expires on logout or browser close

## Future Enhancements
- Mobile application (React Native)
- Push notifications
- Email notifications
- Advanced reporting
- Bulk operations
- Export to PDF/Excel
- Real-time updates with WebSockets

## License
ISC

---
Developed for Elevanda Ventures - Kigali, Rwanda
