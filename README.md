# COMP 3123 - Assignment 1: Secure RESTful Backend API

## Project Overview
This project is a secure RESTful backend API built using **Node.js**, **Express.js**, and **MongoDB (Mongoose)**. It provides user authentication, JWT-based authorization, complete employee CRUD operations, and strict per-user data ownership controls. The application implements industry-standard security measures including password hashing (`bcrypt`), security headers (`Helmet`), rate limiting, request validation, centralized error handling, and local logging.

## Technologies Used
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB & Mongoose (Database Name: `comp3123_assignment1`)
*   **Authentication & Security:** JSON Web Tokens (JWT), bcrypt, Helmet, Express Rate Limit
*   **Validation:** express-validator (Zod)
*   **Logging**

## Architecture & Project Structure
The project follows a modular, layer-based architecture using Express Router to ensure separation of concerns:

```text
COMP3123_Assignment1/
├── controllers/    # Request handlers
├── Services/       # Business logic
├── logging/        # Local log files directory
├── utils/          # Authentication, authorization, and error handling
├── models/         # Mongoose schemas (User and Employee)
├── routes/         # Express API routes (User and Employee)
├── .env.example    # Example environment variables
├── .gitignore
├── server.js       # Application entry point
└── package.json

