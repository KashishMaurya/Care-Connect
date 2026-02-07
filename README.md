# 💙 CareConnect - Digital Identity System

CareConnect is a secure digital identity platform that helps protect vulnerable individuals, children, and pets through QR code-based emergency information access. Built with the MERN stack, SuperTokens authentication, and Cloudinary for media management.
Live link : https://care-connect-sand-five.vercel.app/
---

## 🌟 Key Features

* 🔐 **Secure Authentication** - SuperTokens-powered user management
* 📱 **Multi-Profile Management** - Create profiles for family members, pets, and loved ones
* 🎯 **QR Code Generation** - Unique, scannable codes for instant access
* ⚡ **Instant Emergency Access** - Critical information available immediately when scanned
* 🖼️ **Cloud Image Storage** - Secure photo uploads via Cloudinary
* 📱 **Mobile-Responsive Design** - Works perfectly on all devices
* 🖨️ **Print-Ready QR Codes** - Download and print for ID cards, bracelets, and tags

---

## 🛠 Tech Stack

| Layer          | Technology                  |
|----------------|----------------------------|
| Frontend       | React 18 + Vite            |
| Styling        | CSS3 + Custom Components   |
| Backend        | Express.js + Node.js       |
| Database       | MongoDB + Mongoose         |
| Authentication | SuperTokens                |
| Image Storage  | Cloudinary                 |
| QR Generation  | qrcode.react               |
| Deployment     | Vercel (Frontend) + Render (Backend) |

---

## 📁 Project Structure

```
CareConnect/
├── client/                      # Frontend React Application
│   ├── public/
│   │   └── family_with_QR.png
│   ├── src/
│   │   ├── api/
│   │   │   ├── auth.js
│   │   │   └── axiosInstance.js
│   │   ├── components/
│   │   │   ├── css/
│   │   │   │   ├── CreateProfile.css
│   │   │   │   ├── Dashboard.css
│   │   │   │   ├── LandingPage.css
│   │   │   │   ├── LearnMore.css
│   │   │   │   └── ProfilePublicView.css
│   │   │   └── ui/
│   │   │       ├── Footer.jsx
│   │   │       └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── App.jsx
│   │   │   ├── CreateProfile.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LearnMore.jsx
│   │   │   ├── ProfilePublicView.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── index.css
│   │   │   └── main.jsx
│   │   ├── .env
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.js
│   
├── server/                      # Backend API
│   ├── config/
│   │   ├── cloudinary.js       # Cloudinary configuration
│   │   └── jwt.js              # JWT secret config
│   ├── middleware/
│   │   └── upload.js           # Multer + Cloudinary setup
│   ├── models/
│   │   ├── headUser.js         # User schema
│   │   └── profileID.js        # Profile schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── profileRoutes.js    # Profile CRUD endpoints
│   ├── .env
│   ├── index.js                # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites

* Node.js v18+ and npm
* MongoDB Atlas account (or local MongoDB)
* Cloudinary account (free tier works)

### 1️⃣ Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials:
# - MongoDB connection string
# - Cloudinary API keys
# - JWT secret (min 32 characters)

# Start development server
npm run dev
```

**server/.env Example:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careconnect
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

API_DOMAIN=http://localhost:5000
WEBSITE_DOMAIN=http://localhost:5173
NODE_ENV=development
```

### 2️⃣ Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🌐 API Endpoints

### Authentication (SuperTokens)
* `POST /auth/signup` - Register new user
* `POST /auth/signin` - User login
* `POST /auth/signout` - User logout
* `GET /auth/session/refresh` - Refresh session

### Profile Management
* `POST /api/profiles` - Create new profile (protected)
* `GET /api/profiles/user` - Get all user's profiles (protected)
* `GET /api/profiles/:id` - Get public profile (open)
* `PUT /api/profiles/:id` - Update profile (protected)
* `DELETE /api/profiles/:id` - Delete single profile (protected)
* `DELETE /api/profiles/user/all` - Delete all profiles (protected)

### User Management
* `DELETE /api/auth/delete` - Delete account and all profiles (protected)

---

## 🔐 Security Features

* **Password Hashing** - bcryptjs with salt rounds
* **Session Management** - SuperTokens secure sessions
* **CORS Protection** - Configured allowed origins
* **Input Validation** - Required field checks
* **Protected Routes** - JWT middleware on sensitive endpoints
* **Secure File Upload** - Cloudinary with file type restrictions

---

## 📱 Profile Types Supported

* **Seniors** - Elderly care with medical conditions
* **Children** - Safety information for kids
* **Pets** - Owner contact and vet details
* **Special Needs** - Autism, disabilities, allergies
* **General** - Friends, colleagues, family members

---

## 🖨️ QR Code Usage

1. Create a profile with emergency information
2. System generates unique QR code
3. Download and print QR code
4. Attach to:
   * Medical bracelets
   * ID cards
   * Pet collars/tags
   * Clothing labels
   * Wheelchair/mobility aids

---

## 🚢 Deployment

### Frontend (Vercel)

1. Push client code to GitHub
2. Connect repo to Vercel
3. Configure:
   ```
   Framework: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   ```
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

### Backend (Render)

1. Push server code to GitHub
2. Create new Web Service on Render
3. Configure:
   ```
   Environment: Node
   Build Command: npm install
   Start Command: node index.js
   ```
4. Add all environment variables from .env
5. Enable Auto Deploy

---

## 📦 Package Dependencies

### Backend
* **express** - Web framework
* **mongoose** - MongoDB ODM
* **supertokens-node** - Authentication
* **cloudinary** - Image storage
* **multer** - File upload handling
* **cors** - Cross-origin resource sharing
* **dotenv** - Environment variables
* **bcryptjs** - Password hashing

### Frontend
* **react** & **react-dom** - UI framework
* **react-router-dom** - Client-side routing
* **supertokens-auth-react** - Auth UI components
* **axios** - HTTP client
* **qrcode.react** - QR code generation
* **vite** - Build tool and dev server

---

## 🐛 Troubleshooting

### Issue: CORS Errors
**Solution:** Ensure `WEBSITE_DOMAIN` in server `.env` matches frontend URL

### Issue: MongoDB Connection Failed
**Solution:** Check connection string format and network access in MongoDB Atlas

### Issue: Images not uploading
**Solution:** Verify Cloudinary credentials and check file size limits

### Issue: SuperTokens session errors
**Solution:** Ensure `withCredentials: true` in axios and matching domain configs

---

## 🔄 Future Enhancements

* [ ] SMS/Email alerts when QR is scanned
* [ ] Admin dashboard with analytics
* [ ] Multi-language support
* [ ] Profile sharing with family members
* [ ] Offline mode with service workers
* [ ] Voice commands for accessibility
* [ ] Integration with medical records APIs
* [ ] Geolocation tracking (optional, privacy-first)

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` file for details.

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 Support

For issues or questions:
* Open an issue on GitHub
* Email: support@careconnect.example.com
* Documentation: https://docs.careconnect.example.com

---

## 🙏 Acknowledgments

* SuperTokens for authentication framework
* Cloudinary for media management
* MongoDB Atlas for database hosting
* Vercel & Render for deployment platforms

---


**Built with ❤️ for keeping loved ones safe**
