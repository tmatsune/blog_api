Project: 1 Blog API 
A minimal blog api made with nodejs. Made for simple create, read, update, and delete

/blog-project
│── /backend                 # Node.js backend
│   ├── /src                 
│   │   ├── /routes          # API routes (posts, comments, etc.)
│   │   ├── /controllers     # Business logic for handling requests
│   │   ├── /models          # Database models (if using SQL, ORM models)
│   │   ├── /middlewares     # Authentication, logging, error handling, etc.
│   │   ├── /config          # Database config, environment variables
│   │   ├── /utils           # Helper functions (date formatting, validation, etc.)
│   │   ├── app.js           # Express app initialization
│   │   └── server.js        # Server entry point
│   ├── package.json         
│   ├── .env                 # Environment variables
│   ├── README.md            
│   └── database.sql         # (Optional) SQL schema for database setup
│
│── /frontend                # Frontend (HTML, CSS, JavaScript)
│   ├── /public              # Static assets (images, CSS, JS)
│   ├── /src                 
│   │   ├── /components      # Reusable components (if using vanilla JS)
│   │   ├── /pages           # HTML pages (home.html, post.html, etc.)
│   │   ├── /styles          # CSS files
│   │   ├── /js              # Client-side JavaScript
│   │   ├── index.html       # Main entry point
│   │   ├── app.js           # Main frontend script
│   ├── package.json         
│   ├── README.md            
│
│── /database                # Database-related files (optional)
│   ├── /migrations          # SQL migration scripts
│   ├── /seeds               # Sample data
│
│── .gitignore│── README.md

BACKEND 
/blog-api
│── /src
│   │── /config
│   │   ├── database.ts   # Database connection setup
│   │── /routes
│   │   ├── postRoutes.ts # Routes for blog posts
│   │── /controllers
│   │   ├── postController.ts # Handles request logic
│   │── /models
│   │   ├── postModel.ts  # Database model/queries
│   │── index.ts  # Entry point
│── .env  # Environment variables
│── package.json
│── tsconfig.json
│── README.md

Breakdown:
server.js initializes your app, configures middleware, and sets up routes.
controllers/ contains the route handlers (functions to process the requests).
models/ define the structure of your data and interact with the database.
services/ contain business logic and interact with models.
routes/ define how HTTP requests are routed to controllers.
middlewares/ are custom functions that intercept requests (like for authentication).
