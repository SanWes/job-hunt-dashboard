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
