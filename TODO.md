# User-Centric Sub-collection Migration TODO

## firebaseHelpers.js Updates
- [X] Update `getJobs` function signature to accept `userId`
- [X] Update `getJobs` collection path to `/users/${userId}/jobs`
- [X] Update `addJob` function signature to accept `userId`
- [X] Update `addJob` collection path to `/users/${userId}/jobs`
- [X] Update `updateJob` function signature to accept `userId`
- [X] Update `updateJob` document path to `/users/${userId}/jobs/${id}`
- [X] Update `deleteJob` function signature to accept `userId`
- [X] Update `deleteJob` document path to `/users/${userId}/jobs/${id}`

## App.jsx Integration Updates
- [X] Update `getJobs()` call to `getJobs(user.uid)` in useEffect
- [X] Update `addJobToFirestore(formattedJob)` to `addJobToFirestore(formattedJob, user.uid)`
- [X] Update `deleteJobFromFirestore(jobId)` to `deleteJobFromFirestore(jobId, user.uid)`
- [X] Update `updateJobInFirestore(id, updatedJob)` to `updateJobInFirestore(id, updatedJob, user.uid)`

## Security Rules Implementation
- [X] Create `firestore.rules` file with user isolation rules
- [X] Deploy security rules to Firebase project
- [X] Test multi-user data isolation
- [X] Verify security rules prevent cross-user access

## Testing & Validation
- [X] Test user registration creates isolated data space
- [X] Test job CRUD operations respect user boundaries
- [X] Test security rules block unauthorized access
- [X] Verify UI components work with new architecture

## Data Migration
- [X] Wipe existing `/jobs` collection (as requested)
- [X] Confirm clean slate for new architecture

## Code Review Optimization Sprint

### Phase 1: Critical Stability

- [X] Add guard clauses for user.uid in all Firebase CRUD operations.

- [X] Implement isSubscribed cleanup in the useEffect job fetcher.

- [X] Add environment variable validation in firebase.js.

### Phase 2: Data & Logic Integrity

- [X] Standardize Notes as arrays in both JobForm and JobCard.

- [X] Create a src/utils/formatters.js for global date formatting.

- [X] Move status values (Active, Applied, etc.) to a src/utils/constants.js file.

### Phase 3: React Performance & UI

- [X] Wrap the job filtering logic in useMemo to optimize re-renders.

- [X] Implement a basic ErrorBoundary component to wrap the main App content.

## Phase 4: User Personalization

### Task 1: Form Validation (Industry Standards)

- [X] Implement username validation: 3-15 characters, alphanumeric/underscores only.

- [X] Implement email validation with standard regex check.

- [X] Implement password validation: Minimum 8 characters, including at least one number and one special character.

- [X] Display clear error messages in the UI if validation fails.

### Task 2: Registration Logic

- [X] Add username text input to the Signup form.

- [X] Modify signup function to use updateProfile to set displayName.

- [X] Create Firestore user document using uid as Doc ID with username, email, and createdAt: serverTimestamp().

- [X] Wrap calls in try/catch block handling Firebase-specific errors.

### Task 3: Dashboard Greeting

- [X] Retrieve displayName from auth state in Dashboard.

- [X] Display: <h1>Welcome, [Username]!</h1> greeting.
