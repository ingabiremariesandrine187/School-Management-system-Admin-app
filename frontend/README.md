# School Management System - Admin Frontend

Modern admin interface built with React.js and Tailwind CSS.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
copy .env.example .env
```

3. Update `.env` with your backend API URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Features

### Admin Dashboard
- View statistics (students, teachers, classes, fee collection, attendance)
- Modern card-based UI with Tailwind CSS

### Student Management
- View all students in a responsive table
- Add new students with inline form
- Delete students
- View fee balances

### Teacher Management
- View all teachers
- Manage teacher information

### Class Management
- View all classes
- Manage class information

### Fee Management
- View all transactions
- Approve/reject fee deposits and withdrawals
- Color-coded transaction types and statuses
- Monitor pending transactions

## Technology Stack

- React.js 18
- React Router DOM 6
- Axios for API calls
- Tailwind CSS for styling
- JWT authentication

## Pages

- `/login` - Admin login with gradient background
- `/dashboard` - Dashboard with statistics cards
- `/students` - Student management
- `/teachers` - Teacher management
- `/classes` - Class management
- `/transactions` - Fee transaction management

## Security
- JWT token authentication
- Protected routes
- Device ID verification
- Automatic session expiry
- Secure API communication
