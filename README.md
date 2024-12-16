# Google Lens Mobile UI Clone

## Overview

This project is an assignment to create a pixel-perfect clone of **Google’s image search interface for mobile** using **React Native**. The application replicates the design and core functionality of the Google Lens interface, including a homepage, text search functionality, and partial implementation of image search features.

---

## Features

### Completed Features:

1. **Google App Homepage**

   - Pixel-perfect homepage design with:
     - Search bar and interactive icons (microphone and Lens).
     - Sign-in functionality integrated with Firebase.
     - A real-time dynamic feed layout (using mock data).

2. **Text Search**

   - Fully functional text search with:
     - Real-time search suggestions.
     - Smooth transition to suggestions popup.
     - Responsive design and optimized performance.

3. **Navigation**
   - Bottom tab navigation with sections for Home, History, Notifications, and Menu.
   - Screen transitions using React Navigation.

### Pending Features:

1. **Image Search**
   - **Crop Screen**: Incomplete implementation of the image cropping functionality.
   - **Search Results Screen**: Placeholder for displaying results of an image search (mock data not integrated yet).
   - Glowing stars animation and detailed interactivity for image search results not implemented.

---

## Technologies Used

- **React Native**: Framework for building the app.
- **Firebase Authentication**: Google sign-in functionality.
- **React Navigation**: For seamless navigation between screens.
- **Styled-components**: For consistent and responsive styling.
- **Mock Data**: Simulating dynamic feed and search suggestions.

---

## Setup Instructions

### Prerequisites:

1. Node.js (>= 16.x)
2. npm or yarn package manager
3. Android Studio and/or Xcode for emulators
4. Expo CLI (if using Expo)

### Installation:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. Set up Firebase credentials for Google Sign-In:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add the app configuration (`google-services.json` for Android or `GoogleService-Info.plist` for iOS).
   - Follow Firebase documentation to integrate authentication.

4. Run the app:
   ```bash
   npx react-native run-android # For Android
   npx react-native run-ios     # For iOS
   ```

---

## Project Structure

```plaintext
src
├── assets               # Static assets like images and icons
├── components           # Reusable UI components
├── context              # Global state management (e.g., AuthContext)
├── navigation           # Navigation logic
├── screens              # App screens (Home, TextSearch, etc.)
├── styles               # Global styles and themes
├── utils                # Helper functions and constants
└── App.js               # Entry point of the app
```

---

## Known Issues and Improvements

1. **Image Search Features**:
   - Crop screen functionality is incomplete.
   - Image search results screen needs mock data integration and interactivity.
2. **Animations**:
   - Glowing stars effect for image search is pending.
3. **Testing**:
   - Add unit and integration tests for components and functionality.

---

## How to Use

1. Open the app and sign in using Google.
2. Explore the homepage with a dynamic feed.
3. Use the search bar to try text search with real-time suggestions.
4. (Future feature) Access image search by clicking the Lens icon.

---

## Deliverables

- **APK File**: (Include link if available)
- **GitHub Repository**: [Link to repository](#)
- **Demo Video**: (Include Loom recording link if available)

---

## Credits

- This project was developed as part of an assignment for a Mobile UI Engineer role.

---

## License

This project is licensed under the MIT License.
