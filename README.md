This README covers the full architecture and implementation details for both the mobile frontend and the Node.js backend.

# MemeApp

MemeApp is a full-stack system designed to aggregate and display memes from various internet sources. It consists of a mobile client built with React Native and a backend service running on Node.js.

## System Architecture

The project follows a standard client-server model where the mobile app acts as the presentation layer and the Node.js API handles the business logic and data sourcing.

### 1. Backend Architecture (MemeApp-api)
The server is built with **Node.js** and **Express**. It functions primarily as an API Gateway and Middleware:
* **Request Handling**: Uses Express routes to handle incoming requests from the mobile app.
* **Data Aggregation**: Instead of the mobile app calling multiple external meme APIs directly, the Node.js server fetches data from sources (like Reddit or specialized meme APIs), cleans the response, and standardizes the JSON format.
* **Performance**: By processing data on the server, the mobile app receives smaller, optimized payloads, which reduces battery and data consumption on the user's device.
* **Environment Management**: Uses `dotenv` to manage port configurations and external API keys securely.

### 2. Frontend Architecture (MemeApp-app)
The mobile app is built with **React Native** and **Expo**:
* **Service-Oriented Design**: All API logic is encapsulated in a `services` directory. This allows the UI components to remain "dumb" while the service layer handles the logic of fetching from the Node.js backend.
* **State Management**: Uses React Hooks (`useState`, `useEffect`) to manage the lifecycle of meme data, loading states, and error handling.
* **Styling**: Powered by **NativeWind**, providing a consistent Tailwind CSS experience for mobile components.
* **Navigation**: Uses React Navigation to move between the meme feed, specific categories, and the "Saved" section.

## Implementation Details

### API Implementation (Node.js)
The backend is implemented to be stateless and fast. 
* **CORS**: Configured to allow the mobile app to communicate with the server during development and production.
* **Error Handling**: Global middleware handles 404s and 500 errors to ensure the mobile app never crashes due to an unhandled backend exception.
* **JSON Parsing**: Standard `express.json()` middleware is used to handle incoming data payloads for user preferences or saved memes.

### Mobile App Implementation
* **Dynamic Image Loading**: Since memes vary in size and aspect ratio, the app uses specific scaling logic to ensure images display correctly without being cropped.
* **Native Sharing**: Implements the `react-native-share` or Expo Sharing API, allowing users to send meme images directly from the app to social media.
* **Environment Config**: The app is configured to point to a `BASE_URL`, which is the IP address of the Node.js server.

## Installation and Setup

### 1. Server Setup (MemeApp-api)
The backend must be running for the app to display content.

1.  Clone the repository:
    ```bash
    git clone https://github.com/shiva-kumar-sahoo/MemeApp-api.git
    cd MemeApp-api
    ```
2.  Install Node.js dependencies:
    ```bash
    npm install
    ```
3.  Configure your environment variables in a `.env` file:
    ```env
    PORT=3000
    ```
4.  Start the server:
    ```bash
    npm start
    ```

### 2. Mobile App Setup (MemeApp-app)

1.  Clone the repository:
    ```bash
    git clone https://github.com/shiva-kumar-sahoo/MemeApp-app.git
    cd MemeApp-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Connect to the API:
    In your configuration file (usually `services/api.js` or a `.env` file), set the API URL to your computer's local IP address so the mobile device can reach the server:
    ```text
    API_URL=http://192.168.1.XX:3000
    ```
4.  Start the app:
    ```bash
    npx expo start
    ```

## Tech Stack Summary

* **Frontend**: React Native, Expo, NativeWind, React Navigation.
* **Backend**: Node.js, Express.js.

## Contact
Shiva Kumar Sahoo - codewithshivakumar@gmail.com
