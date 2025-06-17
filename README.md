# 🚍 CampusCommute

**CampusCommute** is a full-stack web application developed using the **MERN stack** (MongoDB, Express.js, React.js with Vite, Node.js). It is a smart and scalable **college bus pass management system** designed to automate and streamline university transportation services for students and staff.

---

## 🌟 Features

### 🡩‍🏫 For Students

- Apply for bus passes online (semester-based)
- Extend bus passes before expiry
- View and download campus bus pass
- Real-time bus schedule lookup by entering city or stop
- Manage user profile (edit name and upload profile picture)
- Track pass usage and payment history
- Razorpay integration for secure online payments (UPI, Cards, Net Banking)
- Downloadable payment receipts and invoices

### 🡩‍💼 For Admins

- Admin dashboard for managing bus and student data
- CRUD operations on bus routes and schedules
- View pass purchase history and revenue reports
- Generate downloadable Excel reports
- Dynamic update of bus schedules and capacities

### 🤖 Chatbot Integration

- Custom chatbot named **Pakkun** trained using **prompt engineering**
- Helps users navigate the platform and provides quick answers about bus timings, registration, and pass status
- Developed using Google Generative AI and integrated with the React frontend

---

## 🧰 Tech Stack

| Layer           | Technology                    |
| --------------- | ----------------------------- |
| Frontend        | React.js + Vite, Tailwind CSS |
| Backend         | Node.js, Express.js           |
| Database        | MongoDB                       |
| Authentication  | JWT-based auth                |
| Payment         | Razorpay Payment Gateway      |
| Chatbot         | Google Generative AI          |
| Version Control | Git & GitHub                  |

---

## 🔧 Installation

### Prerequisites

- Node.js and npm installed
- MongoDB running locally or on MongoDB Atlas
- Razorpay account for test/live payment keys
- Google Generative AI API key (for chatbot)

### Clone the Repository

```bash
git clone https://github.com/Alok8138/campusCommute.git
cd CampusCommute
```

### Backend Setup

```bash
cd server
npm install
# Add .env file with the following keys:
# MONGO_URI=
# JWT_SECRET=
# RAZORPAY_KEY_ID=
# RAZORPAY_SECRET_KEY=

npm start
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 📌 Key Functionalities

- ✅ JWT Authentication (Login/Register)
- 🚌 Student Bus Pass Management
- 🕒 Real-Time Bus Schedules
- 💳 Razorpay Payment Integration
- 📊 Admin Analytics Dashboard
- 🗣️ Generative AI Chatbot with Prompt Engineering

---

## 🎓 Use Cases

- University Transportation System
- College Bus Pass Automation
- Smart Campus Apps for Students
- Chatbot-assisted Campus Services

---

## 📷 Screenshots

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
---

## 🤝 Contributors

- Dharmik Prajapati
- Alok Patel

---

## 📃 License

This project is licensed under the MIT License. Feel free to use, modify, and share with attribution.
