# 📂 THE LEDGER // Strategic Intelligence Terminal

**"Where every opportunity is an entry Committed to the Ledger."**

**THE LEDGER** is a production-ready job application registry built with **React**, **Vite**, and **Firebase Firestore**. It transforms the chaos of a job search into a structured, real-time intelligence operation.

🌐 **Live Terminal:** [https://job-ledger.netlify.app/](https://job-ledger.netlify.app/)  
📦 **Repository:** [https://github.com/SanWes/job-hunt-dashboard](https://github.com/SanWes/job-hunt-dashboard)

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
- **React:** Functional components & hooks (useState, useEffect).
- **Vite:** Modern build tooling for high-speed development.
- **Custom CSS:** Modular, tactical styling with advanced layout logic.

### Backend / Cloud
- **Firebase Firestore:** NoSQL cloud database for real-time data persistence.
- **Security:** Environment variable configuration and defensive error handling.

### Deployment
- **Netlify:** CI/CD workflow + hosting via automated builds.

---

## 🧱 Architecture Highlights & Challenges

### **High-Performance Architecture**
* **Persistence Layer:** Integrated **Google Firestore** for real-time data persistence, utilizing asynchronous `getDocs` and `addDoc` methods to maintain a live cloud-synced manifest.
* **State Management:** Local React state acts as a buffer for the Firestore data, ensuring zero-latency UI updates while background synchronization completes.
* **Environment Security:** Secured sensitive API keys and database credentials via Vite-specific environment variables (`.env`) to prevent exposure in version control.



### **🛠️ Technical Challenges Overcome**
* **The "Unbreakable String" Problem (UI Integrity):** Long continuous strings (specifically Job URLs) were bypassing standard CSS wrapping rules, causing flex containers to overflow. I engineered a **Defensive UI Layout** using `min-width: 0` and `word-break: break-all` to ensure the "Ledger" grid maintains its structural integrity regardless of input length.
* **Tactical Feedback Systems:** To avoid immersion-breaking standard browser alerts, I developed a custom **Haptic UI Feedback** system. This includes the `@keyframes stamp-in` animation for successful commits and a "System Shiver" effect for data destruction (Shredding), reinforcing the terminal’s analog aesthetic.

---

## 🎯 Operational Features

### 🏢 Entity & Function Tracking
Each entry captures the **Entity** (Company) and **Function** (Role), mapped directly to the application’s lifecycle state for immediate situational awareness.

### 🔎 Signal Filtering
Real-time search filtering logic allows users to isolate specific registry nodes instantly based on alphanumeric input, filtering through the Manifest without page refreshes.

### 📝 Strategic Observations
An expandable detail view designed for deep-dive intelligence gathering, supporting:
* **Interview Notes & Compensation:** Tracking high-level financial and logistical data.
* **Technical Benchmarks:** Documentation of required tech stacks and assessment results.
* **General Observations:** Free-form intel on company culture and contact points.

### 🛡️ System Integrity Controls
Integrated validation logic acts as a "Pre-Commit" check, ensuring that all required parameters are strictly enforced before data is authorized for the Ledger.
---

## 🏁 System Initialization (Local Setup)

### 1️⃣ Clone the Repository
```bash
git clone [https://github.com/SanWes/job-hunt-dashboard.git](https://github.com/SanWes/job-hunt-dashboard.git)
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

- 🔐 **Deep Auth Integration**: Transitioning from global manifest access to **Row-Level Security (RLS)**. Utilizing **Firebase Auth UIDs** to architect isolated, user-scoped dossiers.
- 📊 **Data Portability**: Implementation of a **CSV Export Engine** to allow users to extract Manifest data for external auditing and physical backup.
- 🗂️ **Advanced Signal Processing**: Integration of multi-parameter filtering and relational sorting to manage high-volume opportunity pipelines.
- 📱 **Mobile Field Access**: Optimization of the tactical UI for handheld devices, ensuring the Ledger remains responsive for real-time updates during on-site "interviews."

---

## 📜 License

MIT License — Open-source and free to modify.
