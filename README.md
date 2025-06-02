# 💼 Job Hunt Dashboard

A lightweight and intuitive job application tracker built with React, Vite, and Firebase. Stay on top of your job search with this dashboard that helps you organize positions, deadlines, statuses, and notes — all in one place.

🌐 **Live Site**: [https://myjobhunt.netlify.app](https://myjobhunt.netlify.app)

---

## 🛠️ Tech Stack

- **Frontend Framework:** React (via [Vite](https://vitejs.dev/))
- **Styling:** CSS Modules
- **State Management:** React useState, useEffect
- **Database:** Firebase Firestore (read/write/delete jobs)
- **Version Control:** Git + GitHub
- **Deployment:** Netlify
- **Development Tools:** VS Code, GitHub CLI/Terminal

---

## 🎯 Features

- **Job Tracking:** Easily add, edit, and delete job applications.
- **Search Functionality:** Filter job applications by position or company name.
- **Job Status Updates:** Track the status of each application (e.g., Applied, Interviewing, Offer, Rejected).
- **Notes Section:** Add and manage notes for each job application.
- **Responsive Design:** Fully responsive UI for use on mobile and desktop devices.

---

## 🏁 Getting Started

Follow these steps to get the project up and running on your local machine for development and testing.

### 1. Clone the repo

```bash
git clone https://github.com/SanWes/job-hunt-dashboard.git
```



### 2. Install dependencies

Navigate to the project folder and install the required dependencies.

```bash
cd job-hunt-dashboard
npm install
```

### 3. Add your Firebase config

Create a .env file in the root directory with your Firebase credentials:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
⚠️ Do not commit this file — it’s already included in .gitignore.

### 4. Start the development server

After installation, run the development server to start the app.

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser to view the app.

## 🛠️ Build for Production

Netlify automatically builds and deploys the app from the main branch.

To test a local production build:

```bash
npm run build
npx serve dist
```

## 📄 Usage

- Add a new job application by clicking the "Add Job" button.
- Track the progress of your applications using the job status.
- Search for jobs by company or position.
- Add notes to each job to keep track of any relevant details.

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request to the `main` branch.

## Future Improvements

- **User Authentication**  
  Enable users to sign in and save their data securely using Firebase Auth.

- **Export as CSV**  
  Let users download their job application list for offline access or sharing.

- **Dark Mode Support**  
  Add a toggle to switch between light and dark themes for better UX.