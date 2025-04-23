# Sauna Suites - Spa Circuit Selection System

A multi-device spa management system that allows guests to select a spa circuit from a lobby kiosk and view detailed step-by-step instructions on an in-room display.

## System Overview

This application consists of two main interfaces:

1. **Lobby Kiosk** - Where guests check in and select their spa circuit
2. **In-Room Display** - A screen inside the spa suite that displays detailed instructions for the selected circuit

## How It Works

### Communication Between Devices

The kiosk and in-room display communicate through a shared API/database:

1. When a guest selects a circuit on the lobby kiosk, the selection is saved to a database with the room ID
2. The in-room display polls the API to get the latest selected circuit for its room
3. When new data is detected, the in-room display updates to show detailed instructions for the selected circuit

### Technical Implementation

- **Backend API** - Stores session data including room ID, selected circuit, and session status
- **Lobby Kiosk** - React application that saves selections to the API
- **In-Room Display** - React application that fetches data from the API and displays circuit instructions

## Key Features

- Elegant user interface with detailed spa circuit options
- Step-by-step instructions for each spa circuit
- Interactive timer for tracking progress through each circuit step
- Real-time synchronization between lobby kiosk and in-room display
- Door code access information and reminders

## Setup

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_API_ENDPOINT=https://api.saunasuites.com
   ```

### Development

Run the development server:

```
npm run dev
```

### Accessing the In-Room Display

The in-room display is available at `/room/[roomId]`, for example:

```
http://localhost:3000/room/1
```

## Deployment

For a complete deployment, you'll need:

1. The frontend application deployed (can use Vercel, Netlify, etc.)
2. A backend API service (Node.js + Express, Firebase, etc.)
3. A database for storing session data (MongoDB, PostgreSQL, Firestore, etc.)

## Testing

For local testing without a real backend:

1. Run the kiosk application and select a circuit
2. The selection is stored in memory using the mock functions in `api.ts`
3. Open a second browser tab to the room display URL
4. The room display will show the selected circuit from the kiosk
