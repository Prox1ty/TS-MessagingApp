# Messaging App

A real-time messaging application built with React, Express, MongoDB, and Socket.IO.

## Features

- Create an account and sign in
- Join a chat room using a room ID
- Send real-time messages with Socket.IO
- Authenticate users with JWT cookies
- Store users in MongoDB

<img width="798" height="716" alt="スクリーンショット 2026-10-10 122135" src="https://github.com/user-attachments/assets/f18c0275-8c65-4d5a-98a0-6b8b009cf9f6" />
<img width="1032" height="687" alt="スクリーンショット 2026-10-10 122122" src="https://github.com/user-attachments/assets/ccfd4f7a-4a59-42da-83f7-593e889dfd93" />
<img width="1035" height="789" alt="スクリーンショット 2026-10-10 122112" src="https://github.com/user-attachments/assets/1469513e-1cd3-4059-8d58-eeeba48cc17a" />


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
