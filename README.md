
## 🎬 RICHSON TEAM PROJECT
Welcome to the Video Showcase Platform – a powerful and flexible platform specifically designed for video editors, content creators, and anyone who wants to professionally showcase their video projects. This project is built with separate Back-end and Front-end architectures, ensuring scalability, high performance, and an excellent user experience.

## ✨ Key Features * 
**Effortless Google Login:** Allows users to quickly and securely log in using their existing Google accounts. * 
**Category Management (CRUD Category):** Organize your video projects systematically by creating, reading,  and deleting video categories. * 
**Project Management (CRUD Project):** Full control over your video projects, from adding detailed information and descriptions to editing and deleting projects. * 
**User & Role Management:** * Robust user management system, allowing for the creation, editing, and deactivation of accounts. * Flexible role-based permissions to control access and functionalities for each user (e.g., administrator, regular user). * 
** Image/Video Upload & Streaming :** * Easily upload video files and related images for your projects. 

## Back-end:
**Technologies Used**
 - Primary language: TypeScript
 - Framework: Nest JS platform-express
 - Database: MySQL
 - ORM: TypeORM
 - Security: JWT, OAuth Google, Passport for authentication and authorization
 - Validate: Class-transformer, Class-validator

## Front-end:
**Technologies Used**
 - Primary language: TypeScript
 - Framework: Next JS, React
 - CSS Framework: Tailwind CSS
 - Library:  framer-motion, clsx, fontawesome, plyr, swr, axios, Yet Another React Lightbox

## Installation
**Step 1: Clone repository**

    gh repo clone turtleSang/RICHSON_TEAM_PROJECT
**Step 2: Install Backend Dependencies**

    cd backend
    npm install
 **Step 3: Backend Environment Configuration**


    NODE_ENV=development | production
    
    SERVER_PORT=<Your port>
    
    GOOGLE_APP_ID=<Your GOOGLE APP ID>
    
    GOOGLE_APP_SECRET=<Your GOOGLE APP SECRET>
    
    GOOGLE_CALLBACK_URL=<Your back-end URL>/api/auth/google/callback
    
    JWT_SECRET=<Your JWT SECRET>
    
    JWT_IGNORE_EXPIRATION= true | false //shoud be true
    
    MY_SQL_HOST=<Your DB Host>
    
    MY_SQL_PORT=<Your DB PORT>
    
    MY_SQL_USERNAME=<Your DB username>
    
    MY_SQL_PASSWORD=<Your DB Password>
    
    MY_SQL_DATABASE=<Your DB name>
    
    MY_SQL_SYNCHORNIZE= true | false 
    
    ROOT_ADMIN=<admin gmail >
    
    MULTER_DEST=<Location of file videos and image> //example: './upload'
    
    FRONT_END_URL=<your front-end url>
   **Step 5 Start Backend**

    npm run dev

**Step 6: Install Frontend Dependencies**

    cd front-end
    npm install
**Step 7: Frontend Environment Configuration**

    NODE_ENV=development | production
    
    NEXT_PUBLIC_API_URL=<your back-end url >/api
    
    NEXT_PUBLIC_HOST=<your back end host>
 **Step 8: Start Front-end** 

    npm run dev
