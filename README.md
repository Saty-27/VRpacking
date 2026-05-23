# VR Packaging Solutions

Full-stack MERN website for VR Packaging Solutions — a VCI & Seaworthy Packaging manufacturer in Vadodara, Gujarat.

## Tech Stack
- **Frontend:** React.js (Vite)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **File Upload:** Local (Multer)

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & Install
```bash
# Server
cd server && npm install

# Client
cd client && npm install
```

### 2. Configure Environment
Edit `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/vrpacking
JWT_SECRET=your_secret_key
```

### 3. Seed Database
```bash
cd server && npm run seed
```

### 4. Start Development
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

### 5. Access
- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin
- **API:** http://localhost:5000/api

### Admin Credentials
- **Email:** admin@vrpack.co.in
- **Password:** VRPack@2024

## Features
- 12 public pages with 20+ home sections
- Full admin CMS with CRUD for all content
- Dynamic products, blogs, gallery, services
- Contact inquiry system with CSV export
- SEO optimization with meta tags & schema
- Responsive design for all devices
- JWT authentication for admin panel

## Contact
**VR Packaging Solutions**
253/19-A, GIDC Industrial Estate, Makarpura, Vadodara - 390010, Gujarat
Phone: +91 7384 11611 | Email: vijay@vrpack.co.in
