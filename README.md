

# 📚 MERN Full Stack LMS

This is a **Learning Management System (LMS)** built with the **MERN Stack**.  
It provides a complete solution for learners and instructors to manage courses online.

<p align="">
  <a href="https://tech-codz-lms-client.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🔴 Vercel Live-E53935?style=for-the-badge&logo=vercel&logoColor=white&labelColor=E53935" alt="Vercel Live" style="border-radius:12px;">
  </a>
</p>


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
- **Postman** → API Testing 

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

### Home Page
<img width="1900" height="3610" alt="tech-codz-lms-client vercel app_ (1)" src="https://github.com/user-attachments/assets/50989d3c-cd95-40f6-80bd-bf236012fd0d" />


### Instructor Dashboard
<img width="1900" height="1573" alt="tech-codz-lms-client vercel app_ (2)" src="https://github.com/user-attachments/assets/207b4bf6-30cb-4c8e-9890-964e218426ef" />
<img width="1900" height="1445" alt="tech-codz-lms-client vercel app_ (3)" src="https://github.com/user-attachments/assets/3af48df2-9abd-4f31-89a0-6fbc916749da" />
<img width="1900" height="1485" alt="tech-codz-lms-client vercel app_ (4)" src="https://github.com/user-attachments/assets/d891b6b9-8dd8-41f3-9466-8016c7824826" />


### Student Dashboard
<img width="1900" height="1409" alt="tech-codz-lms-client vercel app____clerk_handshake=eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18zMXNMd3gydmt6QTZmS3dCdllrQnJFb3BWaVciLCJ0eXAiOiJKV1QifQ eyJoYW5kc2hha2UiOlsiX19jbGllbnRfdWF0PTsg" src="https://github.com/user-attachments/assets/1ed2f2e3-10ba-4285-8616-ca4b760ed4d1" />
<img width="1900" height="1505" alt="tech-codz-lms-client vercel app_player_68da99f75bbfae745f9ec3b0" src="https://github.com/user-attachments/assets/055a40df-09b7-4047-b836-1075f957086b" />



