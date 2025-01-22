# Expense Tracker Application

## Project Description
The Expense Tracker Application is a web-based tool that helps users manage and track their financial transactions. It allows users to:
- Add, edit, and delete transactions.
- Filter transactions by frequency, type, or date range.
- View transactions in a tabular format or through analytics dashboards.
- Categorize transactions into income or expense with various predefined categories.
- Log in securely with user-specific data stored in a backend server.

Built with React, Ant Design, Axios, and Node.js, the app connects to a backend API for managing transaction data and user authentication.

---

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn
- MongoDB instance (local or hosted)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shanurane/Exp-tracker.git
   cd Exp-tracker
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with the following content:
   ```env
   REACT_APP_URL=http://localhost:8080
   ```
   Replace `http://localhost:8080` with your backend API URL.

4. **Run the Frontend**:
   ```bash
   npm start
   ```
   This will start the React development server on `http://localhost:3000`.

5. **Set Up and Run the Backend**:
   - Navigate to the backend directory (if separate).
   - Install backend dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file for the backend:
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/expense-tracker
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

### Notes
- Ensure MongoDB is running locally or replace the `MONGO_URI` with a hosted MongoDB URI.
---

## Sample API Usage

### Authentication
**Endpoint**: `/users/login`  
**Method**: `POST`

**Request Body**:
```json
{
  "email": "example@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "success": true,
  "user": {
    "_id": "60c72b2f9fd3f1a5d4f8e2d6",
    "email": "example@example.com",
    "name": "example"
  },
  "token": "jwt-token-string"
}
```

### Add Transaction
**Endpoint**: `/transactions/add-transection`  
**Method**: `POST`

**Request Body**:
```json
{
  "userid": "60c72b2f9fd3f1a5d4f8e2d6",
  "amount": 50000,
  "type": "income",
  "category": "Salary",
  "date": "2025-01-20",
  "refrence": "REF12345",
  "description": "Monthly salary"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Transaction added successfully."
}
```

### Get Transactions
**Endpoint**: `/transactions/get-transection`  
**Method**: `POST`

**Request Body**:
```json
{
  "userid": "60c72b2f9fd3f1a5d4f8e2d6",
  "frequency": 7,
  "selectedDate": [],
  "type": "all"
}
```

**Response**:
```json
[
  {
    "_id": "60c72c329fd3f1a5d4f8e2d7",
    "amount": 50000,
    "type": "income",
    "category": "Salary",
    "date": "2025-01-20",
    "refrence": "REF12345",
    "description": "Monthly salary"
  },
  {
    "_id": "60c72c329fd3f1a5d4f8e2d8",
    "amount": 100,
    "type": "expense",
    "category": "Food",
    "date": "2025-01-21",
    "refrence": "REF67890",
    "description": "Lunch"
  }
]
```

---
