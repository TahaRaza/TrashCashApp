# TrashCashApp ♻️

**An eco-friendly mobile application promoting sustainable waste management with QR code-based rewards.**

---

## **Table of Contents**

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Technologies Used](#technologies-used)
5. [Project Structure](#project-structure)
6. [Screens](#screens)
7. [Workflow](#workflow)
8. [Future Work](#future-work)
9. [Contributing](#contributing)
10. [License](#license)

---

## **Introduction**

TrashCashApp is designed to encourage users to adopt sustainable waste disposal practices by rewarding them for proper trash sorting and recycling. By scanning QR codes on trash bins, users earn points that can be redeemed for eco-friendly rewards.

---

## **Features**

- **User Authentication**: Secure signup and login using Firebase Authentication.
- **QR Code Scanning**: Integrated QR scanner to identify and process trash bin codes.
- **Point System**: Users earn points for every scan, stored in a Firebase Realtime Database.
- **User-Friendly Interface**: Minimalistic and intuitive design for easy navigation.
- **Future Plans**:
  - Redeem points for rewards.
  - AI-powered waste classification via camera.
  - Community leaderboard for eco-friendly initiatives.

---

## **Installation**

### **Prerequisites**

- Node.js (v16.x or later)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or Xcode (for emulator testing)
- Firebase Project (set up at [Firebase Console](https://firebase.google.com))

### **Steps**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/TrashCashApp.git
   ```

## Set Up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable Firebase Authentication (Email/Password) and Realtime Database.
3. Copy the Firebase configuration object (`firebaseConfig`) from the Firebase Console.
4. Replace the placeholder configuration in your project (`firebase.js`) with your Firebase configuration.

## Run the App

Start the Expo development server:

```bash
expo start
```

## Test the App on Your Device

### Using Expo Go:

1. Download the Expo Go app on your mobile device.
2. Scan the QR code displayed in your terminal or browser after running `expo start`.

### Using an Emulator:

- **For Android**: Use Android Studio to set up an Android Virtual Device (AVD).
- **For iOS**: Use Xcode to set up an iOS simulator.

## Enjoy the App

Explore the features of TrashCashApp by signing in, scanning QR codes, and earning points!

---

## Technologies Used

**Frontend:** React Native (Expo)  
**Backend:** Firebase (Authentication, Realtime Database)  
**Libraries:**

- `expo-camera`: For QR code scanning.
- `react-navigation`: For app navigation.
- `react-native-paper`: For UI components.

---

## Project Structure

```
TrashCashApp/
├── assets/                # Images, icons, and other assets
├── components/            # Reusable React components
├── navigation/            # Navigation setup
├── screens/               # App screens (Welcome, Login, Signup, Home, Dashboard, QR Scanner)
├── styles/                # Theme and global styles
├── firebase.js            # Firebase configuration
├── App.js                 # Main app entry point
└── package.json           # Project metadata and dependencies
```

---

## Screens

- **Welcome Screen**: Introduction to the app.
- **Login Screen**: User authentication with Firebase.
- **Sign-Up Screen**: Register a new account.
- **Home Screen**: Greet users and display their points.
- **Dashboard Screen**: View detailed statistics and user activity.
- **QR Code Scanner**: Scan QR codes to earn points.

---

## Workflow

The following flow diagram illustrates the TrashCashApp's workflow:

```
[User] --> [Welcome Screen] --> [Login/Sign-Up Screen] --> [Home Screen] --> [Dashboard Screen] --> [QR Scanner] --> [Earn Points]
```

### Steps:

1. Users log in or register.
2. Navigate to the Home Screen.
3. Optionally view detailed stats on the Dashboard Screen.
4. Use the QR Scanner to scan codes on trash bins.
5. Points are updated and stored in Firebase.

---

## Future Work

- Implement rewards redemption functionality.
- Integrate AI-powered waste classification.
- Add a community leaderboard for eco-friendly contributions.
- Expand compatibility with NFC-enabled trash bins.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`feature-branch-name`).
3. Commit your changes.
4. Push the branch and submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
