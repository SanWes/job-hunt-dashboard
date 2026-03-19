# 📂 THE LEDGER // Strategic Intelligence Terminal

**"Where every opportunity is an entry Committed to the Ledger."**

**THE LEDGER** is a high-performance, production-ready job application registry. Built with **React**, **Vite**, and **Firebase**, it transforms the fragmented chaos of a job search into a structured, real-time intelligence operation. 

🌐 **Live Terminal:** [https://job-ledger.netlify.app/](https://job-ledger.netlify.app/)  
📦 **Repository:** [https://github.com/SanWes/job-hunt-dashboard](https://github.com/SanWes/job-hunt-dashboard)

---

## 🎯 The Mission
In a high-volume job market, signal-to-noise ratio is everything. **The Ledger** provides a centralized "Command Center" for professionals to track applications, manage interview intelligence, and monitor their career pipeline with zero latency.

### **Key Operational Features**
* **Zero-Barrier Guest Mode:** Full CRUD capability and data persistence for guest users via `sessionStorage`. Recruiters can test the entire system without creating an account.
* **Secure Authentication:** Integrated **Firebase Auth** with personalized dossiers ("{User}'s Ledger") for registered agents.
* **Real-Time Sync:** Bi-directional synchronization between local React state and **Firestore** NoSQL cloud storage.
* **Responsive Tactical UI:** A mobile-first header with a custom hamburger menu and high-contrast search visibility for field use.
* **Strategic Observations:** Expanded detail views for technical benchmarks, compensation data, and culture intel.

---

## 🛠️ Tech Stack

### **Frontend**
- **React (Vite):** Functional components utilizing Hooks (`useState`, `useEffect`, `useRef`) for optimized renders.
- **React Router:** Declarative routing with **SPA Redirect** handling for production stability.
- **Custom CSS:** Modular, tactical styling using advanced Flexbox/Grid logic and `@keyframes` for haptic feedback.

### **Backend / Cloud**
- **Firebase Firestore:** Real-time NoSQL database management.
- **Firebase Auth:** User-scoped data isolation and secure session handling.

### **Deployment**
- **Netlify:** Automated CI/CD pipeline with custom `_redirects` configuration to manage Single Page Application (SPA) routing on refresh.

---

## 🧱 Technical Architecture & Engineering Wins

### **1. Persistence & State Synchronization**
Implemented a dual-layer persistence strategy. For registered users, data is synced to **Firestore**; for guest users, the system utilizes a **State-to-SessionStorage** bridge. This ensures that a browser refresh never results in data loss, maintaining a seamless "Production-Grade" feel.

### **2. Defensive UI Engineering (The "Unbreakable String")**
Solved overflow issues caused by long continuous strings (e.g., Job URLs) by engineering a **Defensive Layout** using `min-width: 0` and `word-break: break-all`. This ensures structural integrity across all device sizes.

### **3. Surgical State Management**
Refined update logic using the **Spread Operator** (`{ ...job, ...updatedJob }`) to prevent data regression. This ensures metadata like the `dateAdded` remains immutable while allowing specific fields to be updated surgically.

### **4. Production Routing (The 404 Fix)**
Configured custom server-side redirects (`_redirects`) to intercept 404 errors on Netlify, ensuring that deep-linked paths (like `/dashboard`) correctly hand off to the React Router client-side engine.

---

## 🏁 System Initialization (Local Setup)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SanWes/job-hunt-dashboard.git
cd job-hunt-dashboard
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Firebase Configuration (Secure Link)

Create a `.env` file in the root directory. Ensure `.env` is added to your `.gitignore` file to prevent accidental leaks.

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

### 4️⃣ Execute Development Mode

```bash
npm run dev
```

---

## 🧠 Engineering Skills Demonstrated

- Full-Stack Integration: Seamlessly connecting a React frontend to a Firebase backend.
- Asynchronous Flow: Handling complex API calls with robust error boundaries.
- UX Empathy: Implementing smooth-scroll, confirmation guards, and high-contrast accessibility.
- Clean Code Practices: Modular component architecture and descriptive Git version control.

---

## 🚀 Future Directives

- 📊 **Data Portability**: Implementation of a **CSV/JSON Export Engine** to allow users to extract Manifest data for external auditing and physical backup.
- 📱 **Focus Mode**: CSS Scroll Snapping for one-at-a-time entry review on mobile.

---

## 📜 License

MIT License — Open-source and free to modify.
