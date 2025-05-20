# CampusCommute

**CampusCommute** is a web application built using the MERN stack (MongoDB, Express, React, Node.js) that allows students to manage their college bus passes, pay fees, and download campus-bus-pass.

## Features

- **Student Authentication:** Users can authenticate using their email and OTP verification.
- **Bus Pass Management:** Students can download their bus passes after payment.
- **Fee Payment:** Students can pay their fees through the platform.


## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** Email OTP verification


## Screenshots

### Signup Page
![image](https://github.com/user-attachments/assets/2245694b-d8a7-4d5d-bdaa-0e4f35766ab3)

### Home Page
![image](https://github.com/user-attachments/assets/75c324ff-3980-494f-aa7d-d56a1ec99495)

### Profile Page
![image](https://github.com/user-attachments/assets/d3c4c580-de14-4da7-a1c0-c4593a3a3fcb)

### Pass Registration Page
![image](https://github.com/user-attachments/assets/937102b0-1892-42df-aa38-601c2a567af7)

### Admin Deskboard
![image](https://github.com/user-attachments/assets/0fafe15c-fd66-42e6-a358-9edad7bb9beb)

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB database setup

### Steps to Run Locally

1. Clone the repository:
    ```bash
    git clone https://github.com/Alok8138/campusCommute.git
    ```
2. Navigate to the project directory:
    ```bash
    cd campuscommute
    ```

3. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

4. Set up the MongoDB connection by creating a `.env` file in the backend directory and adding your MongoDB connection string:
    ```
    MONGO_URI=your_mongodb_connection_string
    ```

5. Start the backend server:
    ```bash
    npm run dev
    ```

6. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

7. Start the frontend development server:
    ```bash
    npm run dev
    ```

Your app should now be running on `http://localhost:3000`.

## Contributing

Feel free to fork this repository, submit issues, or make pull requests. Contributions are welcome!

