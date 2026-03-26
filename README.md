CivicEye – AI-Powered Civic Complaint Management System
________________________________________________________

🌍 Overview
-------------
CivicEye is an AI-powered civic complaint management system designed to streamline how public issues are reported and handled.

Citizens can report issues like garbage, drainage problems, or road damage, and the system automatically:

Classifies complaints using AI
Assigns priority levels
Maps them to the correct government department
Generates a concise summary

🚀 This significantly reduces manual effort and improves response efficiency for authorities.

❗ Problem Statement
---------------------
Manual complaint sorting is slow and inefficient
No proper prioritization of issues
Lack of automation in routing complaints

💡 Solution
------------
CivicEye leverages AI to:

Automatically categorize complaints
Assign priority (Low / Medium / High)
Route complaints to the correct department
Enable faster and smarter decision-making

🏗️ Architecture (Microservices)
--------------------------------
User → React Frontend → API Gateway → Microservices → AI Service → Gemini API → MySQL

⚙️ Tech Stack
--------------
🔹 Backend
  -Spring Boot (Microservices)
  -Spring Cloud Gateway
  -Spring Security
  -WebClient (Inter-service communication)
  -Eureka (Service Discovery)

🔹 Frontend
  -React (Vite)

🔹 Database
  -MySQL
  
🔹 Authentication
  -JWT (JSON Web Token)
  
🔹 AI Integration
  -Google Gemini API (gemini-2.5-flash)
  
🧩 Microservices Overview
--------------------------
👤 user-service

  🔹User registration & login
  🔹JWT token generation
  🔹Stores user credentials
  
📄 report-service

  🔹Create complaints
  🔹Upload images (stored locally)
  🔹Calls AI service
  🔹Stores complaint data in MySQL
  🔹Admin can update complaint status
  
🤖 ai-service
_______________
  🔹Integrates with Gemini API
  🔹Processes:
  🔹Complaint description
  🔹Optional image (Base64)
  🔹Returns:
  🔹Category
  🔹Priority
  🔹Department
  🔹Summary
  
🌐 api-gateway
  🔹Single entry point for frontend
  🔹Routes requests to microservices
  🔹Integrated with Eureka
  
🔍 discovery-server (Eureka)
  🔹Registers all services
  🔹Enables service-to-service communication
  
✨ Features
------------
  ✔ User Registration & Login
  ✔ JWT Authentication (Role-based: ADMIN, CITIZEN)
  ✔ Complaint Creation
  ✔ Image Upload (multipart/form-data)
  
  ✔ AI-based Complaint Analysis:
  
  Category detection
  Priority assignment
  Department mapping
  Summary generation
  
  ✔ Complaint storage in MySQL
  
  ✔ Admin Features:
  
  Update complaint status
  OPEN → IN_PROGRESS → RESOLVED
  
  ✔ Secure APIs using Spring Security + @PreAuthorize
  
  ✔ Frontend:
  
  🔹Login page
  🔹Register page
  🔹Complaint submission form
  
  ▶️ How to Run the Project
  ------------------------
  🔧 Prerequisites
  
  Java 17+
  Node.js
  MySQL
  
🛠️ Backend Setup
-----------------
🔹Start MySQL and create database:

  -CREATE DATABASE civiceye; 
  
🔹Update database credentials in application.yml

🚀 Start Microservices (Order Important)
    🔹Discovery Server (Eureka)
    🔹API Gateway
    🔹User Service
    🔹Report Service
    🔹AI Service
💻 Frontend Setup
    🔹cd Civiceye_frontend
    🔹npm install
    🔹npm run dev
🌐 Default Ports
    🔹Service	Port
    🔹Eureka Server	8761
    🔹API Gateway	8080
    🔹User Service	8081
    🔹Report Service	8082
    🔹AI Service	8083
    🔹Frontend (Vite)	5173
🔄 Application Flow
    🔹User submits complaint via frontend
    🔹Request goes through API Gateway
    🔹Report Service processes complaint
    🔹AI Service analyzes using Gemini
    🔹Data stored in MySQL
    🔹Admin manages complaint status
    
📌 Current Status
    ✅ Backend fully functional
    ✅ AI integration working
    ✅ Image upload working
    ✅ Basic frontend UI completed

🚀 Future Enhancements
    🔹Citizen Dashboard (view complaints)
    🔹Admin Dashboard (manage complaints)
    🔹Status update UI
    🔹Display uploaded images
    🔹Advanced UI (cards, filters, navbar)
    🔹Notifications system
    🔹Map integration for location tracking
