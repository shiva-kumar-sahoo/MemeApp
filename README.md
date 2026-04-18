# MemeApp

A full-stack mobile application that aggregates and displays memes from multiple internet sources. Built with React Native for the frontend and Node.js for the backend, MemeApp provides a seamless meme browsing experience with features like favorites, sharing, and category filtering.

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Application Flow](#application-flow)
- [API Integration](#api-integration)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Contributing](#contributing)
- [License](#license)

## Overview

MemeApp is designed to provide users with a curated feed of memes from various sources across the internet. The application uses a client-server architecture where the backend aggregates content from multiple meme APIs and serves it to the mobile app in a standardized format. This approach reduces the complexity on the client side and provides better performance by offloading data processing to the server.

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     External Meme Sources                        │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Reddit  │  │ Imgur    │  │  Other   │  │  Custom  │       │
│  │   API    │  │   API    │  │  Sources │  │  Sources │       │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘  └─────┬────┘       │
└────────┼─────────────┼─────────────┼─────────────┼──────────────┘
         │             │             │             │
         └─────────────┴─────────────┴─────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Backend Server (Node.js)                      │
│                                                                  │
│  ┌────────────────────────────────────────────────────┐        │
│  │            API Gateway & Aggregator                 │        │
│  │  - Fetches from multiple sources                    │        │
│  │  - Standardizes response format                     │        │
│  │  - Caches frequently accessed memes                 │        │
│  │  - Filters inappropriate content                    │        │
│  └─────────────────────┬──────────────────────────────┘        │
│                        │                                        │
│  ┌─────────────────────▼──────────────────────────────┐        │
│  │              Express Routes                         │        │
│  │  /api/memes          - Get all memes                │        │
│  │  /api/memes/category - Get by category              │        │
│  │  /api/memes/random   - Get random meme              │        │
│  └────────────────────────────────────────────────────┘        │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           │ HTTPS/REST
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Mobile Client (React Native)                    │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐          │
│  │             Presentation Layer                    │          │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │          │
│  │  │  Home    │  │Category  │  │ Saved    │       │          │
│  │  │  Screen  │  │  Screen  │  │ Screen   │       │          │
│  │  └──────────┘  └──────────┘  └──────────┘       │          │
│  └──────────────────────────────────────────────────┘          │
│                        │                                        │
│  ┌─────────────────────▼──────────────────────────────┐       │
│  │             Context Layer                           │       │
│  │  - Global state management                          │       │
│  │  - Meme favorites                                   │       │
│  │  - User preferences                                 │       │
│  └─────────────────────┬──────────────────────────────┘       │
│                        │                                        │
│  ┌─────────────────────▼──────────────────────────────┐       │
│  │             Services Layer                          │       │
│  │  - API communication                                │       │
│  │  - Data transformation                              │       │
│  │  - Error handling                                   │       │
│  └────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### Component Architecture

**Backend Components:**
- **API Gateway**: Central entry point that routes requests to appropriate handlers
- **Aggregation Engine**: Fetches and combines data from multiple sources
- **Response Normalizer**: Standardizes different API responses into a uniform format
- **Cache Layer**: Stores frequently accessed memes to reduce external API calls
- **Error Handler**: Manages failures gracefully and provides meaningful error messages

**Frontend Components:**
- **Screen Components**: Handle UI rendering and user interactions
- **Context Providers**: Manage global state (favorites, preferences)
- **Service Layer**: Abstracts API calls and data fetching logic
- **Navigation**: Manages screen transitions and deep linking
- **UI Components**: Reusable components (cards, buttons, modals)

## Features

- Browse memes from multiple sources in a unified feed
- Category-based filtering (funny, wholesome, dark humor, etc.)
- Save favorite memes locally
- Share memes to social media platforms
- Pull-to-refresh for new content
- Infinite scroll loading
- Offline viewing of saved memes
- Image caching for faster load times
- Cross-platform support (iOS and Android)
- Dark mode support

## Tech Stack

### Frontend (Mobile App)

- **Framework**: React Native
- **Build Tool**: Expo
- **Language**: JavaScript (JSX)
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Navigation**: React Navigation
- **State Management**: Context API
- **Image Handling**: Expo Image / React Native Fast Image
- **Sharing**: React Native Share / Expo Sharing
- **Storage**: AsyncStorage / Expo SecureStore

### Backend (API Server)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **Environment Management**: dotenv
- **HTTP Client**: Axios / node-fetch
- **CORS**: cors middleware
- **Rate Limiting**: express-rate-limit

### Development Tools

- **Version Control**: Git
- **Code Formatting**: Prettier
- **Linting**: ESLint
- **Build**: Expo EAS Build
- **Testing**: Jest (optional)

## Prerequisites

Before starting, ensure you have:

- Node.js (v14.x or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Git
- Android Studio (for Android development) or Xcode (for iOS development)
- A physical device or emulator for testing

## Installation

### Backend Setup (MemeApp-api)

```bash
# Clone the backend repository
git clone https://github.com/shiva-kumar-sahoo/MemeApp-api.git
cd MemeApp-api

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### Frontend Setup (MemeApp)

```bash
# Clone the mobile app repository
git clone https://github.com/shiva-kumar-sahoo/MemeApp.git
cd MemeApp

# Install dependencies
npm install

# Install iOS dependencies (Mac only)
cd ios && pod install && cd ..
```

## Configuration

### Backend Configuration

Create a `.env` file in the backend root directory:

```env
PORT=3000
NODE_ENV=development

# External API Keys (if required)
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_secret
IMGUR_CLIENT_ID=your_imgur_client_id

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Configuration

Update the API endpoint in your app. Create or edit the config file:

**File: `constant/config.js`**

```javascript
// For local development
export const API_BASE_URL = 'http://192.168.1.X:3000';

// For production
// export const API_BASE_URL = 'https://your-api-domain.com';
```

Replace `192.168.1.X` with your computer's local IP address.

## Running the Application

### Start the Backend Server

```bash
cd MemeApp-api
npm start
```

The server should start on `http://localhost:3000`. You should see:

```
Server running on port 3000
Environment: development
```

### Start the Mobile App

```bash
cd MemeApp
npx expo start
```

This will open Expo DevTools in your browser. From there:

- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Scan the QR code with Expo Go app on your physical device

## Project Structure

### Mobile App Structure

```
MemeApp/
├── assets/                 # Static assets (images, fonts)
│   ├── images/
│   ├── icons/
│   └── fonts/
├── components/             # Reusable UI components
│   ├── MemeCard.jsx
│   ├── CategoryFilter.jsx
│   ├── LoadingSpinner.jsx
│   └── ShareButton.jsx
├── constant/               # App constants and configurations
│   ├── config.js
│   ├── colors.js
│   └── categories.js
├── context/                # Context providers for state management
│   ├── MemeContext.jsx
│   └── FavoritesContext.jsx
├── ios/                    # iOS native code
├── lib/                    # Utility functions and helpers
│   ├── storage.js
│   ├── formatters.js
│   └── validators.js
├── screens/                # Screen components
│   ├── HomeScreen.jsx
│   ├── CategoryScreen.jsx
│   ├── SavedScreen.jsx
│   └── MemeDetailScreen.jsx
├── services/               # API service layer
│   ├── api.js
│   ├── memeService.js
│   └── storageService.js
├── App.jsx                 # Root component
├── Navigation.js           # Navigation configuration
├── app.json                # Expo configuration
├── babel.config.js         # Babel configuration
├── eas.json                # EAS Build configuration
├── package.json            # Dependencies
└── tailwind.config.js      # TailwindCSS configuration
```

### Backend Structure

```
MemeApp-api/
├── config/                 # Configuration files
│   ├── database.js
│   └── apiKeys.js
├── controllers/            # Request handlers
│   └── memeController.js
├── middleware/             # Express middleware
│   ├── errorHandler.js
│   ├── rateLimit.js
│   └── cors.js
├── models/                 # Data models (if using database)
│   └── Meme.js
├── routes/                 # API routes
│   └── memeRoutes.js
├── services/               # Business logic
│   ├── aggregator.js
│   ├── redditService.js
│   └── cacheService.js
├── utils/                  # Utility functions
│   ├── normalizer.js
│   └── logger.js
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── server.js               # Entry point
```

## Application Flow

### Meme Loading Flow

```
┌──────────────────┐
│  User Opens App  │
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│  App Initialization  │
│  - Load Context      │
│  - Check Storage     │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Navigate to Home    │
│  Screen              │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Fetch Memes from    │
│  API Server          │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐     ┌─────────────────┐
│  Server Receives     │────▶│  Aggregate Data │
│  Request             │     │  from Sources   │
└──────────────────────┘     └────────┬────────┘
                                      │
                                      ▼
                             ┌─────────────────┐
                             │  Normalize      │
                             │  Response       │
                             └────────┬────────┘
                                      │
                                      ▼
                             ┌─────────────────┐
                             │  Return JSON    │
                             │  to App         │
                             └────────┬────────┘
                                      │
         ┌────────────────────────────┘
         │
         ▼
┌──────────────────────┐
│  Process Response    │
│  - Parse JSON        │
│  - Update State      │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Render Meme Cards   │
│  on Screen           │
└──────────────────────┘
```

### Favorite Meme Flow

```
┌──────────────────┐
│  User Taps       │
│  Favorite Button │
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│  Check if Already    │
│  Favorited           │
└────────┬─────────────┘
         │
         ├─ Yes ──▶ Remove from Favorites
         │
         └─ No ───▶ Add to Favorites
                   │
                   ▼
         ┌──────────────────────┐
         │  Update Context      │
         │  State               │
         └────────┬─────────────┘
                  │
                  ▼
         ┌──────────────────────┐
         │  Save to Local       │
         │  Storage             │
         └────────┬─────────────┘
                  │
                  ▼
         ┌──────────────────────┐
         │  Update UI           │
         │  (Heart Icon)        │
         └──────────────────────┘
```

### Share Meme Flow

```
┌──────────────────┐
│  User Taps       │
│  Share Button    │
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│  Download Meme       │
│  Image (if needed)   │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Open Native Share   │
│  Dialog              │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐     ┌─────────────────┐
│  User Selects        │────▶│  Share to       │
│  Platform            │     │  Selected App   │
└──────────────────────┘     └─────────────────┘
```

### Category Filter Flow

```
┌──────────────────┐
│  User Selects    │
│  Category        │
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│  Update Active       │
│  Category State      │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐
│  Fetch Memes for     │
│  Selected Category   │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────┐     ┌─────────────────┐
│  Request to Server   │────▶│  Filter Memes   │
│  /api/memes/category │     │  by Category    │
└──────────────────────┘     └────────┬────────┘
                                      │
                                      ▼
                             ┌─────────────────┐
                             │  Return Filtered│
                             │  Results        │
                             └────────┬────────┘
                                      │
         ┌────────────────────────────┘
         │
         ▼
┌──────────────────────┐
│  Display Filtered    │
│  Memes               │
└──────────────────────┘
```

## API Integration

### API Endpoints

The backend provides the following REST endpoints:

#### Get All Memes

```
GET /api/memes
```

**Query Parameters:**
- `limit` (optional): Number of memes to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "meme_123",
      "title": "Funny meme title",
      "imageUrl": "https://example.com/meme.jpg",
      "category": "funny",
      "source": "reddit",
      "author": "username",
      "createdAt": "2026-04-19T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 1000,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

#### Get Memes by Category

```
GET /api/memes/category/:category
```

**Parameters:**
- `category`: Category name (funny, wholesome, dark, etc.)

**Response:**
```json
{
  "success": true,
  "category": "funny",
  "data": [...]
}
```

#### Get Random Meme

```
GET /api/memes/random
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "meme_456",
    "title": "Random funny meme",
    "imageUrl": "https://example.com/random.jpg",
    "category": "funny"
  }
}
```

### Service Layer Example

**File: `services/memeService.js`**

```javascript
import axios from 'axios';
import { API_BASE_URL } from '../constant/config';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const memeService = {
  async getAllMemes(limit = 20, offset = 0) {
    try {
      const response = await api.get('/api/memes', {
        params: { limit, offset },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async getMemesByCategory(category) {
    try {
      const response = await api.get(`/api/memes/category/${category}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  async getRandomMeme() {
    try {
      const response = await api.get('/api/memes/random');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  handleError(error) {
    if (error.response) {
      return new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
      return new Error('Network error. Please check your connection.');
    } else {
      return new Error('An unexpected error occurred');
    }
  },
};
```

## Development

### Running in Development Mode

**Backend:**
```bash
cd MemeApp-api
npm run dev
```

**Frontend:**
```bash
cd MemeApp
npm start
```

### Code Style

This project follows standard JavaScript conventions. Run the linter:

```bash
npm run lint
```

Format code with Prettier:

```bash
npm run format
```

### Testing

Run tests (if configured):

```bash
npm test
```

### Debugging

**React Native Debugger:**
1. Install React Native Debugger
2. Open it on port 19000
3. In the app, shake the device and select "Debug"

**Backend Debugging:**
Use VS Code debugger or add:
```javascript
console.log('Debug info:', variable);
```

## Building for Production

### Mobile App Build

**Configure EAS:**
```bash
eas build:configure
```

**Build for Android:**
```bash
eas build --platform android --profile production
```

**Build for iOS:**
```bash
eas build --platform ios --profile production
```

**Submit to App Stores:**
```bash
eas submit --platform all
```

### Backend Deployment

The backend can be deployed to various platforms:

**Heroku:**
```bash
heroku create memeapp-api
git push heroku main
```

**Vercel:**
```bash
vercel --prod
```

**DigitalOcean / AWS:**
Follow their respective Node.js deployment guides.

## Performance Optimization

### Image Caching

The app implements image caching to improve load times:

```javascript
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: meme.imageUrl }}
  style={styles.image}
  resizeMode={FastImage.resizeMode.cover}
/>
```

### API Response Caching

The backend caches frequently accessed memes:

```javascript
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCachedMemes(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Commit Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation updates
- `style:` Code formatting
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests
- `chore:` Maintenance tasks

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

**Developer**: Shiva Kumar Sahoo  
**Email**: codewithshivakumar@gmail.com  
**GitHub**: https://github.com/shiva-kumar-sahoo

## Acknowledgments

- Meme sources: Reddit, Imgur, and other meme communities
- React Native community for excellent documentation
- Expo team for their amazing tools

---

Made with ❤️ by developers who love memes
