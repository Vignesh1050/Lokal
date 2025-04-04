
---

# MyJobsApp

A React Native app (built with Expo) that displays a list of jobs from a given API, supports infinite scrolling, allows viewing job details, and bookmarking jobs for offline access. The app has two main tabs: **Jobs** and **Bookmarks**.

---

## Table of Contents
- [MyJobsApp](#myjobsapp)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Project Setup](#project-setup)
  - [Running the App](#running-the-app)
  - [Folder Structure](#folder-structure)
  - [How It Works](#how-it-works)
  - [Troubleshooting](#troubleshooting)
  - [License](#license)

---

## Features

1. **Bottom Tab Navigation**  
   - **Jobs** tab  
   - **Bookmarks** tab  

2. **Infinite Scroll**  
   - Fetch jobs from `https://testapi.getlokalapp.com/common/jobs?page=1`  
   - Loads subsequent pages when scrolling near the bottom  
   - Displays loading spinners, empty states, and error states

3. **Job Detail Screen**  
   - Tapping a job in the list navigates to a detail screen  
   - Shows extended info (location, salary, phone, etc.)  
   - **Bookmark Button**: toggles the job in/out of bookmarks

4. **Bookmarking**  
   - Bookmarked jobs are saved offline via `AsyncStorage`  
   - **Bookmarks** tab shows all offline-saved jobs  
   - Each bookmarked job can be tapped to revisit its detail screen

5. **Offline Access**  
   - Bookmarks are persisted locally  
   - Users can view saved jobs even without an internet connection

6. **States**  
   - **Loading State**: shows spinner when fetching or reading data  
   - **Error State**: retry button if fetch fails  
   - **Empty State**: message for no jobs found or no bookmarks  

---

## Requirements

- **Expo CLI** (version ^6 or later recommended)  
- Node.js (LTS or later)  
- A device or emulator/simulator (Android or iOS)  

> This project uses [React Navigation](https://reactnavigation.org/) instead of the Expo Router.

---

## Project Setup

1. **Clone** or download this repository:
   ```bash
   git clone https://github.com/your-username/MyJobsApp.git
   ```
2. **Install dependencies**:
   ```bash
   cd MyJobsApp
   npm install
   ```
3. **Confirm `app.json`** does NOT include `expo-router` references and that `"main"` is not set to `"expo-router/entry"`.  
4. **Optional**: If you prefer Yarn:
   ```bash
   yarn
   ```

---

## Running the App

To start the development server:

```bash
npx expo start --clear
```

- **Press** `a` to launch Android emulator, `i` for iOS simulator, or scan the QR code with the Expo Go app on your device.
- If you see any version mismatch warnings, you can generally fix them by running:
  ```bash
  npx expo install <packageName>
  ```

---

## Folder Structure

```
MyJobsApp
├─ App.js                       # Entry point (uses RootNavigator)
├─ package.json
├─ app.json                     # Expo config (no expo-router references!)
├─ node_modules/
└─ src/
   ├─ navigation/
   │   ├─ RootNavigator.js      # Bottom tab navigator (JobsTab, BookmarksTab)
   │   └─ JobsStack.js          # Stack for JobsListScreen & JobDetailScreen
   └─ screens/
       ├─ JobsListScreen.js     # Infinite scrolling list of jobs
       ├─ JobDetailScreen.js    # Detailed view with bookmark button
       └─ BookmarksScreen.js    # Shows all saved bookmarks (offline)
```

- **App.js**: The main entry point that loads our `RootNavigator`.  
- **RootNavigator.js**: Sets up the bottom tab navigation (Jobs, Bookmarks).  
- **JobsStack.js**: Inside the “Jobs” tab, this is a stack with **JobsList** → **JobDetail**.  
- **JobsListScreen.js**: Implements infinite scroll, loading/error states, and item navigation.  
- **JobDetailScreen.js**: Displays extended info for a job, includes the bookmark toggle.  
- **BookmarksScreen.js**: Reads bookmarked jobs from AsyncStorage and lists them.

---

## How It Works

1. **Jobs tab**  
   - Fetches data from `https://testapi.getlokalapp.com/common/jobs?page=1`  
   - Shows results in a `FlatList`, with **`onEndReached`** to fetch next pages.  
   - Tapping a job calls `navigation.navigate('JobDetail', { job: item })`.

2. **Job Detail**  
   - Shows job details (location, salary, phone)  
   - A “Bookmark” button saves or removes the job in AsyncStorage (via `bookmarkedJobs` key).

3. **Bookmarks tab**  
   - On load (and whenever the screen refocuses), reads from AsyncStorage to display offline-saved jobs.  
   - Tapping a bookmarked job navigates back to the detail screen.

4. **Offline**  
   - Bookmarks remain in AsyncStorage even if you close the app or lose internet access.

---

## Troubleshooting

- **Stuck on “Welcome to Expo Router”**  
  - Confirm `app/` folder is removed or renamed.  
  - Remove `"expo-router"` from `package.json`, `app.json` plugins, and `babel.config.js`.
- **Version mismatch warnings**  
  - Run `npx expo install <package-name>` to match Expo’s recommended version.
- **Infinite Scroll Not Triggering**  
  - Ensure you have an `onEndReachedThreshold` (e.g. `0.5`) and `onEndReached` is properly set.  
  - Check your API’s pagination logic to see if more pages exist.
- **Bookmarks Not Saving**  
  - Confirm you’re using `AsyncStorage.getItem` and `setItem` with correct keys, e.g. `'bookmarkedJobs'`.

---

