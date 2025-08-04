# Major Project by Delta

A full-stack web application for managing listings with user authentication, image uploads, reviews, and search functionality. Built with Node.js, Express, MongoDB, and EJS templating.

## 🚀 Features

- **User Authentication & Authorization**
  - User registration and login
  - Session management with Passport.js
  - Role-based access control (owners can edit/delete their listings)

- **Listing Management**
  - Create, read, update, and delete listings
  - Image upload with Cloudinary integration
  - Search listings by location
  - Detailed listing pages with reviews

- **Review System**
  - Users can add reviews to listings
  - Reviews are associated with both listings and users
  - Automatic cleanup when listings are deleted

- **Modern UI/UX**
  - Responsive design with EJS templating
  - Flash messages for user feedback
  - Clean and intuitive interface

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with Local Strategy
- **File Upload**: Multer with Cloudinary storage
- **Template Engine**: EJS with EJS-Mate
- **Session Management**: Express-session with MongoDB store
- **Validation**: Joi for data validation
- **Environment**: dotenv for configuration

## 📋 Prerequisites

- Node.js (v22.15.0 or higher)
- MongoDB database
- Cloudinary account for image storage

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd major-project-by-delta
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**
   ```bash
   node app.js
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
major-project-by-delta/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (create this)
├── .gitignore            # Git ignore file
├── cloudConfig.js        # Cloudinary configuration
├── middleware.js         # Custom middleware functions
├── schemaValidater.js    # Joi validation schemas
├── controllers/          # Route controllers
│   ├── listingController.js
│   └── reviewController.js
├── models/              # MongoDB schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/              # Express routes
│   ├── listingsRoute.js
│   ├── reviewsRoute.js
│   └── usersRoute.js
├── views/               # EJS templates
│   ├── listings/
│   ├── users/
│   ├── include/
│   └── layout/
├── public/              # Static assets
└── utils/               # Utility functions
    └── asyncWrap.js
```

## 🔧 API Endpoints

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Create new listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View specific listing
- `GET /listings/:id/edit` - Edit listing form
- `PATCH /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing
- `GET /listings/search` - Search listings by location

### Reviews
- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

### Users
- `GET /signup` - User registration form
- `POST /signup` - Register new user
- `GET /login` - Login form
- `POST /login` - User login
- `GET /logout` - User logout
- `GET /account` - show profile
- `GET /account/password` - Change Password Form
- `POST /account/password` - Change Password



## 🔐 Authentication & Authorization

- **Registration**: Users can create accounts with username and password
- **Login**: Secure authentication using Passport.js
- **Session Management**: Persistent sessions with MongoDB store
- **Authorization**: Users can only edit/delete their own listings
- **Middleware**: Custom middleware for authentication checks

## 🖼️ Image Upload

- **Cloudinary Integration**: Images are stored in Cloudinary cloud
- **Multer**: Handles file uploads
- **Image Management**: Automatic filename generation and URL storage

## 🔍 Search Functionality

- **Location-based Search**: Search listings by location
- **Real-time Results**: Instant search results
- **Error Handling**: User-friendly messages when no results found

## 🎨 UI Features

- **Responsive Design**: Works on desktop and mobile devices
- **Flash Messages**: Success and error notifications
- **Clean Interface**: Modern and intuitive user experience
- **Navigation**: Easy navigation between pages

## 🛡️ Security Features

- **Input Validation**: Joi schemas for data validation
- **Session Security**: Secure session configuration
- **Authentication**: Protected routes and user verification
- **File Upload Security**: Secure image upload handling

## 🚀 Deployment

This application can be deployed to various platforms:

- **MongoDB_Atlas**: DataBase Hosting
- **Render**: My Project is depoly on render 
Live Link : "https://easybnb.onrender.com/"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Belal Raza**

## 🙏 Acknowledgments

- Express.js community for the excellent framework
- MongoDB team for the robust database
- Cloudinary for image storage services
- Passport.js for authentication solutions

---

**Note**: Make sure to set up your environment variables properly and have MongoDB running before starting the application. 