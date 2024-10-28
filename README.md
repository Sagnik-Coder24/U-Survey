# Basic Survey App

A simple web application built with React and Vite that allows users to complete a survey. The app uses Firebase for authentication, database storage, and hosting. The interface is styled with CSS.

## About Firebase

[Firebase](https://firebase.google.com/) is a platform developed by Google for creating mobile and web applications. It provides a variety of tools and services to help developers build high-quality apps, including:

- **Firebase Authentication**: Provides backend services to authenticate users with passwords, phone numbers, and popular federated identity providers like Google, Facebook, and Twitter.
- **Firebase Realtime Database**: A NoSQL cloud database that allows you to store and sync data between your users in real-time.
- **Firebase Firestore**: A flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud Platform.
- **Firebase Hosting**: Provides fast and secure hosting for your web app, static and dynamic content, and microservices.
- **Firebase Cloud Functions**: Lets you run backend code in response to events triggered by Firebase features and HTTPS requests.
- **Firebase Cloud Messaging**: A cross-platform messaging solution that lets you reliably send messages at no cost.

Firebase integrates seamlessly with other Google services and provides a comprehensive suite of tools to help you develop, grow, and earn money from your app.

For more information, visit the [Firebase Documentation](https://firebase.google.com/docs).

## Features

- User authentication with Firebase
- Store survey responses in Firebase Realtime Database
- Host the app on Firebase Hosting
- Responsive design with CSS

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Firebase CLI](https://firebase.google.com/docs/cli)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sagnik-Coder24/U-Survey.git
   cd U-Survey
   ```

2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

### Firebase Configuration

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable Email/Password authentication in the Authentication section.
3. Create a Realtime Database in the Database section.
4. Set up Firebase Hosting in the Hosting section.
5. Create a `.env` file in the root directory and add your Firebase configuration:

   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_firebase_database_url
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

### Running the App

1. Start the development server:

   ```bash
   yarn dev
   # or
   npm run dev
   ```

2. Open your browser and go to `http://localhost:5173` to see the app in action.

### Deployment

1. Build the app for production:

   ```bash
   yarn build
   # or
   npm run build
   ```

2. Deploy to Firebase Hosting:

   ```bash
   firebase deploy
   ```

## Usage

1. Sign in using your email and password or Google.
2. Complete the survey by answering the questions.
3. Submit your responses to store them in the Firebase Realtime Database.

## Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Firebase](https://firebase.google.com/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Contributions

We welcome contributions from the community! Feel free to open issues and pull requests to suggest improvements, add new features, or fix bugs. Here’s how you can contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a pull request

### Suggestions & Feedback

If you have suggestions or feedback on how to improve this project, feel free to post them on our [GitHub Issues](https://github.com/Sagnik-Coder24/U-Survey/issues) page. We love hearing your ideas and collaborating with the community!
