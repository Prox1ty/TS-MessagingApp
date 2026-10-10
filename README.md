# Messaging App

A real-time messaging application built with React, Express, MongoDB, and Socket.IO.

## Features

- Create an account and sign in
- Join a chat room using a room ID
- Send real-time messages with Socket.IO
- Authenticate users with JWT cookies
- Store users in MongoDB

## Project Structure

```text
src/
  backend/    Express API, authentication, MongoDB models, and Socket.IO server
  react/      React and Vite frontend
```

## Requirements

- Node.js
- npm
- MongoDB running locally or a MongoDB connection string

## Configuration

Create `src/.env` with:

```env
PORT=8000
MONGODB_CONNECTION=mongodb://rest-of-your-connection-url
JWTSECRET=replace-with-a-long-random-secret
```

## Running the Application

Install the backend dependencies from the project root:

```bash
npm install
```

Install the frontend dependencies:

```bash
cd src/react
npm install
```

Start the backend in one terminal:

```bash
npx tsx src/backend/app.ts
```

Start the frontend in another terminal:

```bash
cd src/react
npm run dev
```

Open `http://localhost:5173` in a browser.

## Frontend Commands

Run a production build:

```bash
cd src/react
npm run build
```

Run the linter:

```bash
cd src/react
npm run lint
```