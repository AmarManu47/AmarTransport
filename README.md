# AmarTransport
webiste related to the trasnport

 <!-- folder structure for backend process -->
backend/
├─ package.json
├─ .env
├─ server.js
├─ db.js
├─ routes/
│  ├─ auth.js
│  ├─ vehicles.js
│  ├─ bookings.js
│  └─ quotes.js
├─ middleware/
│  └─ authMiddleware.js
├─ controllers/
│  └─ (optional controllers)
└─ sql/
   └─ schema.sql


<!-- folder structure for the frontend  -->
frontend/
├─ package.json -
├─ vite.config.js -
├─ src/ -
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ api/
│  │  └─ axiosClient.js
│  ├─ store/
│  │  ├─ index.js
│  │  └─ authSlice.js
│  ├─ context/
│  │  └─ UIContext.jsx
│  ├─ pages/
│  │  ├─ Login.jsx
│  │  ├─ Dashboard.jsx
│  │  └─ QuoteForm.jsx
│  ├─ components/
│  │  └─ FleetList.jsx
│  └─ utils/
│     └─ authHeader.js
└─ public/
