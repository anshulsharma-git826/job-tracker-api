# 🗂️ Job Tracker API

A RESTful backend API built with **Node.js, Express.js, and MongoDB** to track job and internship applications. Features complete user authentication, full CRUD operations, search, filter, sort, pagination, and a dashboard with application statistics.

---

## 🚀 Features

- **User Authentication** — Register, Login, JWT-based protected routes, bcrypt password hashing
- **Job Management** — Create, Read, Update, Delete job applications
- **Search** — Search by company, role, or location
- **Filter** — Filter by status, job type, location, or company
- **Sort** — Sort by salary, company name, applied date, or created date (asc/desc)
- **Pagination** — Page-based results with configurable limit
- **Dashboard Stats** — Total applications, interview count, offers, rejections
- **Favorites** — Mark important applications
- **Archive** — Archive instead of deleting
- **Interview Tracking** — Store interview date, time, and mode

---

## 🛠️ Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Runtime               |
| Express.js | Web Framework         |
| MongoDB    | Database              |
| Mongoose   | ODM                   |
| JWT        | Authentication        |
| bcryptjs   | Password Hashing      |
| dotenv     | Environment Variables |

---

## 📁 Folder Structure

```
job-tracker-api/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── authController.js   # Auth logic
│   └── jobController.js    # Job logic
├── middlewares/
│   ├── authMiddleware.js   # JWT verification
│   └── errorMiddleware.js  # Error handling
├── models/
│   ├── User.js             # User schema
│   └── Job.js              # Job schema
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   └── jobRoutes.js        # Job endpoints
├── utils/
│   └── generateToken.js    # JWT generator
├── app.js
├── server.js
└── .env
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/job-tracker-api.git
cd job-tracker-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the server

```bash
# Development
npm run dev

# Production
npm start
```

---

## 📌 API Endpoints

### Auth Routes

| Method | Endpoint             | Description                | Auth |
| ------ | -------------------- | -------------------------- | ---- |
| POST   | `/api/auth/register` | Register a new user        | ❌   |
| POST   | `/api/auth/login`    | Login and get token        | ❌   |
| GET    | `/api/auth/profile`  | Get logged in user profile | ✅   |

### Job Routes (All Protected)

| Method | Endpoint                 | Description                                |
| ------ | ------------------------ | ------------------------------------------ |
| POST   | `/api/jobs`              | Create a job application                   |
| GET    | `/api/jobs`              | Get all jobs (search/filter/sort/paginate) |
| GET    | `/api/jobs/:id`          | Get a single job                           |
| PUT    | `/api/jobs/:id`          | Update a job                               |
| DELETE | `/api/jobs/:id`          | Delete a job                               |
| PATCH  | `/api/jobs/:id/favorite` | Toggle favorite                            |
| PATCH  | `/api/jobs/:id/archive`  | Toggle archive                             |
| GET    | `/api/jobs/dashboard`    | Get dashboard statistics                   |

---

## 🔍 Query Parameters

```
GET /api/jobs?search=Google
GET /api/jobs?status=Applied
GET /api/jobs?jobType=Internship
GET /api/jobs?sort=-salary
GET /api/jobs?page=1&limit=10
GET /api/jobs?search=Google&status=Applied&sort=-appliedDate&page=1&limit=5
```

### Available Sort Options

| Value          | Description             |
| -------------- | ----------------------- |
| `salary`       | Salary ascending        |
| `-salary`      | Salary descending       |
| `company`      | Company A-Z             |
| `-company`     | Company Z-A             |
| `appliedDate`  | Applied date ascending  |
| `-appliedDate` | Applied date descending |
| `-createdAt`   | Newest first (default)  |

---

## 📊 Dashboard Response

```json
{
  "success": true,
  "dashboard": {
    "total": 20,
    "applied": 8,
    "interview": 4,
    "offer": 2,
    "rejected": 5,
    "accepted": 1
  }
}
```

---

## 🔐 Application Status Values

```
Applied → OA Received → OA Completed → Interview Scheduled
→ HR Round → Technical Round → Offer → Accepted / Rejected
```

---

## 📝 Sample Job Object

```json
{
  "company": "Google",
  "role": "SDE Intern",
  "location": "Bangalore",
  "salary": 50000,
  "jobType": "Internship",
  "status": "Applied",
  "appliedDate": "2026-06-30",
  "link": "https://careers.google.com",
  "notes": "Referral from LinkedIn",
  "isFavorite": false,
  "isArchived": false
}
```

---

## 👤 Author

**Anshul Sharma**  
[GitHub](https://github.com/anshulsharma-git826)
