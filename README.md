#  Countdown Timer App (Full Stack)

A **modern full-stack countdown timer website** built using **React (Vite)** and **Node.js + Express + MongoDB**.  
It allows users to **sign up, log in, or continue as a guest**, then create stylish countdowns for upcoming events with animated timers and a sleek interface.

---

##  Features
1 Dynamic countdown timers for upcoming events  
2 Guest Login and user authentication (JWT-based)  
3 MongoDB integration for saving user sessions and events  
4 Responsive, modern UI (no Tailwind used – pure CSS)  
5 Separate modules for helper functions and time formatting  
6 Color-changing countdowns when less than a minute left  
7 Fully functional backend API with Express  
8 Modular structure for scalability  

---

## Folder Structure

```
countdown-timer-app/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── utils/
│
├── frontend/
│   ├── vite.config.js
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── helpers/
│       └── styles/
│
└── README.md
```

##  Tech Stack

| Layer       | Technology Used |
|--------------|----------------|
| Frontend     | React (Vite) + CSS3 |
| Backend      | Node.js + Express.js |
| Database     | MongoDB Atlas |
| Auth         | JSON Web Tokens (JWT) |
| Styling      | Pure CSS + modern animations |

---

##  Setup Instructions

### 1️ Clone the Repository
```bash
git clone https://github.com/VedantRajekar/Countdown-Timer
cd countdown-timer-app
```

### 2️ Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/` and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
Then run:
```bash
npm run dev
```

### 3️ Setup Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend will start on:  
 **http://localhost:5173**

---

## UI Highlights

- Elegant and modern homepage  
- Animated circular countdown timers  
- Responsive layout for all screen sizes  
- Eye-catching gradients and transitions  
- Smooth hover effects on interactive elements  

---

## Key Modules

### `helper.js`
Contains utility functions for:
- Time formatting (`HH:MM:SS`)
- Event logging
- Countdown color transitions

### `Countdown Component`
Implements smooth circular countdown using `setInterval()` with live animation updates.

---

## Screenshots

**Landing Page:**  
<img width="1919" height="1079" alt="Landing Page" src="https://github.com/user-attachments/assets/c0edc77c-77fa-406a-8001-1672d633244a" />

**Dashboard:**  
<img width="1919" height="1079" alt="Dashboard" src="https://github.com/user-attachments/assets/a980a151-2241-4a2f-96f9-406bfba49e49" />

---

##  Developed By

**Vedant Rajekar [23070521113]**  
_B.Tech CSE, Symbiosis Institute of Technology, Nagpur_

---

##  Run Frontend & Backend Together (Optional)

If you want to start both servers at once, install `concurrently`:

```bash
npm install concurrently
```

Then add this script in your **root** `package.json`:
```json
"scripts": {
  "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\""
}
```

Run both:
```bash
npm run dev
```

---

**Star this repo** if you like the project!
