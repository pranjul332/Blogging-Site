# Blogging Website

    A full-stack blogging website built with **React** (frontend) and **Node.js/Express** (backend). This project allows users to create, read, update, and delete blog posts, along with user authentication and       other features.

---

## Features

- **User Authentication**: Sign up, log in, and log out functionality.
- **Create Blog Posts**: Users can create and publish new blog posts.
- **Read Blog Posts**: View all published blog posts on the homepage.
- **Update Blog Posts**: Authors can edit their own blog posts.
- **Delete Blog Posts**: Authors can delete their own blog posts.
- **Responsive Design**: The website is fully responsive and works on all devices.

---

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling client-side routing.
- **Axios**: For making HTTP requests to the backend.
- **Tailwind CSS**: For styling the frontend components.

### Backend
- **Node.js**: A JavaScript runtime for building the backend.
- **Express**: A web framework for Node.js.
- **MongoDB**: A NoSQL database for storing blog posts and user data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Tokens)**: For user authentication and authorization.

### Tools
- **Git**: For version control.
- **VS Code**: The code editor used for development.
- **Postman**: For testing API endpoints.

---

## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. Download it from [here](https://nodejs.org/).
- **MongoDB**: Install MongoDB locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **Git**: Install Git from [here](https://git-scm.com/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/blogging-website.git
   cd blogging-website
   
### Install dependencies for the backend:

   cd backend
   npm install
   
### Install dependencies for the frontend:

    cd ../frontend
    npm install
    
### Set up environment variables:

Create a .env file in the backend folder and add the following:

    PORT=5000
    MONGO_URI=mongodb://localhost:27017/blogging-website
    JWT_SECRET=your_jwt_secret_key
### Start the backend server:
    cd ../backend
    npm start
### Start the frontend development server:
    cd ../frontend
    npm start
### Access the application:

    Open your browser and go to http://localhost:3000.

### Folder Structure
    blogging-website/
    ├── backend/
    │   ├── controllers/       # Logic for handling routes
    │   ├── models/            # MongoDB models
    │   ├── routes/            # API routes
    │   ├── middleware/        # Authentication middleware
    │   ├── config/            # Database configuration
    │   ├── .env               # Environment variables
    │   └── server.js          # Entry point for the backend
    ├── frontend/
    │   ├── public/            # Static assets
    │   ├── src/
    │   │   ├── components/    # Reusable React components
    │   │   ├── pages/         # Pages of the application
    │   │   ├── utils/         # Utility functions
    │   │   ├── App.js         # Main application component
    │   │   └── index.js       # Entry point for the frontend
    │   └── package.json       # Frontend dependencies
    ├── .gitignore             # Files and folders to ignore in Git
    └── README.md              # Project documentation
    
### API Endpoints
Authentication
    POST /api/auth/register - Register a new user.
    POST /api/auth/login - Log in an existing user.

### Blog Posts
    GET /api/posts - Get all blog posts.
    
    GET /api/posts/:id - Get a single blog post by ID.
    
    POST /api/posts - Create a new blog post (requires authentication).
    
    PUT /api/posts/:id - Update a blog post by ID (requires authentication).
    
    DELETE /api/posts/:id - Delete a blog post by ID (requires authentication).

### Contributing
    Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
    
    Fork the repository.
    
    Create a new branch (git checkout -b feature/YourFeatureName).
    
    Commit your changes (git commit -m 'Add some feature').
    
    Push to the branch (git push origin feature/YourFeatureName).
    
    Open a pull request.

### License
    This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgments
    React Documentation
    
    Express Documentation
    
    MongoDB Documentation
    
    Tailwind CSS Documentation
