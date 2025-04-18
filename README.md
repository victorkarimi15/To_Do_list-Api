# 📝 To-Do List RESTful API

A Node.js-based RESTful API that allows users to manage their personal to-do lists securely and efficiently. This project implements best practices in authentication, database design, and clean RESTful principles.

---

## 🚀 Goals

Through this project, you'll gain hands-on experience in:

- 🔐 User authentication
- 🗃️ Schema design & database integration
- 🌐 RESTful API architecture
- 🧱 CRUD operations
- ⚠️ Error handling
- 🛡️ Security best practices

---

## ✅ Features

- User Registration & Login with JWT authentication
- Token-based user authorization for all endpoints
- Secure password hashing with bcrypt
- Full CRUD operations on to-do tasks
- Pagination & filtering support for task lists
- Data validation using middleware
- Centralized error handling
- MongoDB database integration (with Mongoose)

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **cookie-parser**, **dotenv**, **cors**, etc.

---

## 📚 API Endpoints

### 🧑‍💻 Auth

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | `/signup`      | Register a new user      |
| POST   | `/login`       | Authenticate user        |

### 📌 To-Do Tasks

| Method | Endpoint             | Description                        |
|--------|----------------------|------------------------------------|
| GET    | `/tasks`             | Get all tasks (with pagination)    |
| GET    | `/tasks/:id`         | Get a specific task                |
| POST   | `/tasks`             | Create a new task                  |
| PUT    | `/tasks/:id`         | Update a task                      |
| DELETE | `/tasks/:id`         | Delete a task                      |

> 🔐 All `/tasks` routes require a valid token.

---

## ⚙️ Requirements

- Node.js and npm installed
- MongoDB running locally or in the cloud

---

## 📥 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/todo-api.git

cd todo-api

# Install dependencies
npm install

# Create a .env file and set your environment variables
touch .env

# Sample .env
PORT=3000
MONGO_URI=mongodb://localhost:27017/to_do_list
ACCESS_SECRET=your_jwt_secret
