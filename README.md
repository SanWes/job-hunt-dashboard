# 📂 THE LEDGER // Strategic Intelligence Terminal

A production-ready job application registry built with **React**, **Vite**, and Firebase **Firestore**.

**THE LEDGER** is a structured, real-time application tracking system designed to centralize opportunity management through a tactical, analyst-driven interface.

🌐 **Live Terminal:** https://job-ledger.netlify.app/
📦 **Repository:** https://github.com/SanWes/job-hunt-dashboard

---

## 🧭 Project Overview

THE LEDGER enables users to:

- Maintain a centralized **Manifest** of job applications  
- Track each **Entity** (Company) and **Function** (Role)  
- Record structured **Strategic Observations** (interview notes, compensation, technical benchmarks)  
- Update application lifecycle status in real time  
- Filter and isolate opportunities instantly  

This project demonstrates real-world full-stack architecture, Firestore integration, state-driven UI updates, and production deployment practices.

---

## 🛠️ Tech Stack

### Frontend
- React (Functional Components)
- Vite (Modern build tooling)
- Custom CSS Modules
- Responsive Layout Design
- React Hooks (`useState`, `useEffect`)

### Backend / Cloud
- Firebase Firestore (NoSQL database)
- Real-time data synchronization
- Environment variable configuration
- Client-side validation & defensive error handling

### Deployment
- Netlify (CI/CD workflow + hosting)

---

## 🎯 Operational Features

### 📂 Centralized Manifest
Users can initialize, append, update, and archive registry entries within a structured application ledger.

### 🏢 Entity & Function Tracking
Each entry captures:
- **Entity** (Company)
- **Function** (Role)
- Application lifecycle state

### 🔎 Signal Filtering
Real-time search filtering to isolate registry nodes instantly based on user input.

### 📝 Strategic Observations
Expandable detail view supporting:
- Interview notes
- Compensation insights
- Technical requirements
- General observations

### 🧩 Tactical UI Architecture
- Expandable registry nodes
- Controlled form inputs
- Conditional rendering
- State-driven reactivity
- Structured UI feedback messaging (`CRITICAL: PARAMETERS REQUIRED`)

### 🛡️ System Integrity Controls
Integrated validation logic ensures required parameters are enforced before committing data to the Manifest.

---

## 🔄 Application Lifecycle States

THE LEDGER tracks opportunity progression through:

- `Filed`
- `Active`
- `Secured`
- `Archived`

Lifecycle transitions are handled via state updates and Firestore persistence.

---

## 🧱 Architecture Highlights

- Modular component structure
- Firestore configuration isolated via `.env`
- Asynchronous data fetching with effect hooks
- Controlled form handling
- Clean separation between UI state and database logic
- Real-time re-rendering on registry updates
- Production deployment via Netlify

This project demonstrates practical full-stack engineering patterns in a modern React environment.

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

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

⚠️ **Security Notice:**  
Do not commit the `.env` file. Credentials must remain local.

---

### 4️⃣ Execute Development Mode

```bash
npm run dev
```

Visit:

```
http://localhost:5173
```

---

## 📄 Operational Usage

- **Initialize Entry**  
  Use the `INITIATE REGISTRY` header to open the intake form.

- **Commit Data**  
  Execute `COMMIT TO LEDGER` to finalize a record in the Manifest.

- **Manage Records**  
  Expand registry nodes to review Strategic Observations or “Shred” entries.

- **Monitor Status**  
  Track lifecycle transitions from `Filed` → `Active` → `Secured` → `Archived`.

---

## 🧠 Engineering Skills Demonstrated

- Cloud database integration (Firestore)
- Environment-based configuration management
- Asynchronous state handling
- Controlled form architecture
- Real-time filtering logic
- Defensive validation and UI feedback systems
- Production deployment workflow
- Clean Git version control practices

---

## 🚀 Future Directives

- 🔐 Firebase Authentication (user-scoped Manifests)
- 📊 CSV export of Manifest data
- 📈 Analytics dashboard for lifecycle insights
- 🗂️ Advanced filtering & sorting controls
- 📱 Enhanced mobile optimization

---

## 📜 License

MIT License — Open-source and free to modify.
