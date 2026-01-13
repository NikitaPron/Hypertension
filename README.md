# Hypertension Therapy Simulation Platform

This platform simulates personalized antihypertensive therapy using patient data.

## Features

- Web interface for inputting patient parameters
- Backend simulation of therapy effects for different drugs
- Results display with blood pressure and heart rate trends

## Technologies

- Frontend: React.js
- Backend: Node.js + Express
- Stub calculation (to be replaced with BioUML integration)

## Installation and Running

### Prerequisites

- Node.js (version 18 or higher)

### Setup

1. Install Node.js from https://nodejs.org/

2. Install backend dependencies:

   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running

1. Start the backend server:

   ```
   cd backend
   npm start
   ```

   Server will run on http://localhost:3001

2. Start the frontend (in a new terminal):
   ```
   cd frontend
   npm start
   ```
   App will open in browser at http://localhost:3000

## API

- POST /simulate: Accepts patient data, returns simulation results for 5 drugs over 30 days

## Future Integration

Replace the stub function in `backend/server.js` with actual BioUML calculations when the mathematical model is ready.
