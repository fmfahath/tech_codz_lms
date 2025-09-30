

# 📚 MERN Full Stack LMS

This is a **Learning Management System (LMS)** built with the **MERN Stack**.  
It provides a complete solution for learners and instructors to manage courses online.

---

## 🚀 Features

### 👨‍🎓 User Side
- Register & login using **email authentication (Clerk)**
- View all available courses
- Enroll in courses through secure payment
- Access **Course Enrollment Dashboard**
- Track & manage individual course progress

### 🎓 Publisher / Instructor Side
- Any user can upgrade to **Course Publisher**
- Upload and manage courses
- Manage enrolled students
- Access **Admin Dashboard** for course & student management

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Custom CSS**

### Backend
- **Node.js**
- **Express.js**

### Database
- **MongoDB Atlas**

### Other Integrations
- **Clerk** → User Authentication
- **Cloudinary** → Image/File Upload
- **Vercel** → Hosting (Frontend & Backend)

---

## 📂 Project Structure
- /client -> React frontend
- /server -> Express & Node backend
- /models -> MongoDB schemas
- /routes -> API routes
- /controllers -> Business logic

---

## ⚡ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/tech_codz_lms.git
cd tech_codz_lms
```
## 2️⃣ Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```
## 3️⃣ Setup environment variables

Create a .env file in server and add:

```bash
MONGO_URI=your_mongodb_connection_string
CLERK_API_KEY=your_clerk_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
PAYMENT_GATEWAY_KEY=your_payment_gateway_key
```
## 4️⃣ Run the project

```bash
# Run backend (server)
cd server
npm run server

# Run frontend (client)
cd ../client
npm run dev
```
## 📸 Screenshots


