# EventHub - Event Management System

A comprehensive event management platform built with Node.js/Express backend and React frontend.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Role-based Access**: Attendee, Organizer, and Admin roles
- **Event Management**: Create, edit, and manage events
- **Event Registration**: Register for events with capacity management
- **Private Events**: Access control with codes and domain restrictions
- **Email Notifications**: Registration confirmations and reminders
- **Search & Filter**: Find events by category, type, and text search
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Nodemailer for email notifications
- Express Validator for input validation
- Multer for file uploads

### Frontend

- React 18 with TypeScript
- Wouter for routing
- Tailwind CSS for styling
- Axios for API calls
- React Query for state management
- Radix UI components

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd event-management-system
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory (copy from `.env.example`):

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/eventhive
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

### 4. Start the Application

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend (in a new terminal):

```bash
cd client
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register

Register a new user

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "attendee", // "attendee", "organizer", "admin"
  "organizationType": "individual", // required if role is "organizer"
  "company": "Company Name" // optional
}
```

#### POST /api/auth/login

Login user

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /api/auth/me

Get current user details (requires Bearer token)

### Event Endpoints

#### GET /api/events

Get all events with optional filtering

```
Query parameters:
- search: text search in title/description
- category: filter by category
- eventType: "public" or "corporate"
- status: "draft", "published", "cancelled", "completed"
```

#### POST /api/events

Create new event (protected)

```json
{
  "title": "Tech Conference 2024",
  "description": "Annual technology conference",
  "category": "Technology",
  "eventType": "public",
  "date": "2024-12-01",
  "time": "09:00 AM",
  "location": "Convention Center",
  "isVirtual": false,
  "capacity": 100,
  "tags": ["tech", "conference"],
  "status": "published",
  "accessControl": {
    "isPrivate": false,
    "accessCode": "CODE123",
    "allowedDomains": ["company.com"]
  }
}
```

#### PUT /api/events/:id

Update event (organizer only)

#### DELETE /api/events/:id

Delete event (organizer only)

#### GET /api/events/my-events

Get organizer's events (protected)

### Registration Endpoints

#### POST /api/registrations/:eventId

Register for an event (protected)

```json
{
  "accessCode": "CODE123" // optional, required for private events
}
```

#### DELETE /api/registrations/:eventId

Cancel registration (protected)

#### GET /api/registrations/my-registrations

Get user's registrations (protected)

```
Query parameters:
- status: "confirmed", "cancelled", "waitlist"
```

#### GET /api/registrations/event/:eventId/attendees

Get event attendees (organizer only)

## User Flows

### For Attendees

1. Register/Login to the platform
2. Browse available events
3. Search and filter events by category, type, etc.
4. Register for events
5. View registered events in dashboard
6. Cancel registrations if needed

### For Organizers

1. Register as an organizer
2. Create and manage events
3. Set event details, capacity, and access controls
4. View event attendees
5. Edit or delete events
6. Monitor registration counts

## Environment Variables

### Backend (.env)

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 3001)
- `EMAIL_USER` - Email address for notifications
- `EMAIL_PASS` - Email password/app password

## Development

### Backend Development

```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development

```bash
cd client
npm run dev  # Vite dev server with hot reload
```

### Database Setup

Make sure MongoDB is running locally or update the `MONGO_URI` to point to your MongoDB instance.

## Production Deployment

### Backend

```bash
cd server
npm start
```

### Frontend

```bash
cd client
npm run build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
