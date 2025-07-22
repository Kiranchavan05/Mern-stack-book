# BookManager (MERN Stack)

This project is a full-stack Book Manager application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Hosted Demo
- [Live App on Vercel](https://books-bice.vercel.app/)

---

## Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)

---

### 1. Clone the Repository
```bash
# Clone the repository
git clone <your-repo-url>
cd <your-repo-folder>
```

---

### 2. Backend Setup

```bash
cd backend
# Install backend dependencies
npm install

# Create a .env file for environment variables
cp .env.example .env
# Edit .env and set your MongoDB URI (MONGO_URI)

# Start the backend server (default: http://localhost:5000)
npm run dev
```

- The backend server will run on [http://localhost:5000](http://localhost:5000) by default.
- Make sure your MongoDB URI is correct in `.env`.

---

### 3. Frontend Setup

```bash
cd ../frontend
# Install frontend dependencies
npm install

# Start the React app (default: http://localhost:3000)
npm start
```

- The frontend will run on [http://localhost:3000](http://localhost:3000) by default.
- The frontend is configured to connect to the backend at `http://localhost:5000/api/books` (change in `src/App.js` if needed).

---

### 4. Usage
- Open [http://localhost:3000](http://localhost:3000) in your browser.
- You can add, edit, delete, search, sort, and paginate books.

---

### 5. Environment Variables Example (`backend/.env.example`)
```
MONGO_URI='mongodb+srv://kiranchavan0502:123projectkiran@cluster0.xi9mf.mongodb.net/books-collection?retryWrites=true&w=majority'
PORT=5000
```

---

### 6. Notes
- **node_modules** are not included in the repo. You must run `npm install` in both `backend` and `frontend` folders.
- For production, update the API URLs in the frontend as needed.

---

### 7. Tech Stack
- **Frontend:** React.js, Material-UI (MUI)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas or local)

---

### 8. License
MIT 