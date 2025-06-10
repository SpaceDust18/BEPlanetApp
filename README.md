# BEPlanetApp 🌌

A secure backend API delivering planetary data and features, with full user authentication and route protection.

## 📚 Overview

**BEPlanetApp** is a Node.js + Express application that allows authenticated users to explore and manage information about planets and their features. It includes:

- RESTful routes
- PostgreSQL database
- JWT authentication
- Secure password hashing (bcrypt)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Auth:** JWT (JSON Web Tokens), bcrypt
- **Hosting:** Local / Cloud-compatible

---

## 🗄️ Database Schema

```sql
table users {
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL
}

table planets {
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL,
  description text NOT NULL
}

table features {
  id serial PRIMARY KEY,
  name text NOT NULL,
  planet_id integer REFERENCES planets(id) ON DELETE CASCADE
}
🔐 Authentication Routes
POST /users/register – Create user, hash password, return JWT

POST /users/login – Authenticate user, return JWT

Passwords are hashed with bcrypt. All planet and feature routes are protected and require a valid token.

🌍 Planet Routes
Method	Route	Description
GET	/planets	Get all planets 🔒
GET	/planets/:id	Get single planet 🔒
POST	/planets	Create a planet 🔒
PUT	/planets/:id	Update a planet 🔒
DELETE	/planets/:id	Delete a planet 🔒

✨ Feature Routes
Method	Route	Description
GET	/features	Get all features 🔒
GET	/features/:id	Get single feature 🔒
POST	/features	Create a feature 🔒
PUT	/features/:id	Update a feature 🔒
DELETE	/features/:id	Delete a feature 🔒

🔒 All routes above require a valid JWT

⚠️ Error Handling
400 for missing or invalid fields

401 for unauthorized access (missing/invalid token)

403 for forbidden actions

Custom error messages returned with every failure

📦 Project Setup
bash
Copy code
# Install dependencies
npm install

# Set environment variables in .env file
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_postgres_url

# Run database setup
npm run db:schema
npm run db:seed

# Start the server
npm run dev
📌 Notes
All user-related data is stored securely.

Protected routes validate JWT and attach decoded user data.

Foreign key relationships ensure relational integrity.

🧠 Future Features
Admin role access

Public API documentation

Frontend integration (React, Next.js)

