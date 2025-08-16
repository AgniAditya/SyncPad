## SyncPad

SyncPad is a real-time collaboration and file sharing platform. It enables multiple users to connect, share files, and collaborate on documents seamlessly, with instant updates powered by Socket.IO.

## Features

* **User Authentication** – Secure login & registration with JWT and bcrypt

* **Real-time Collaboration** – Multiple users can edit and chat simultaneously

* **File Sharing** – Share and manage files instantly

* **Collaborative Editing** – Edit files in real-time without conflicts

* **Live Updates** – Instant synchronization across all connected clients

* **Cross-platform Support** – Works in browser with Socket.IO

## Tech Stack

* **Backend**: Node.js, Express.js, Socket.IO

* **Database**: MongoDB (Mongoose ODM)

* **Authentication**: JWT, bcrypt

* **Utilities**: dotenv, cookie-parser, cors, validator

* **Dev Tools**: Nodemon

## Project Structure

```
SyncPad
│
├── public/
│   ├── index.html
│   ├── styles.css
├── src/
│   ├── config/              # Environment configs, DB connections
│   │   ├── db.js            # MongoDB connection
│   │   └── env.js           # Loads env variables
│   │
│   ├── models/              # Mongoose models
│   │   ├── user.model.js
│   │   ├── document.model.js
│   │   ├── message.model.js
│   │
│   ├── controllers/         # REST API logic
│   │   ├── user.controller.js
│   │
│   ├── services/            # Business logic (separate from controllers)
│   │   ├── user.service.js
│   │
│   ├── routes/              # API route definitions
│   │   ├── user.route.js
│   │
│   ├── socket/             # WebSocket event handlers
│   │   └── chat.socket.js
│   │
│   ├── middlewares/          # Middlewares
│   │   ├── auth.middleware.js
│   │
│   ├── utils/               # Helper functions
│   │   ├── apiError.js
│   │   ├── apiResponse.js
│   │   └── asyncHandler.js
│   │
│   ├── app.js               # Express app setup
│   ├── socketServer.js      # Socket.IO setup
│   └── index.js             # Entry point
│
├── test/                    # test cases
│
├── .env                     # Environment variables
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/AgniAditya/SyncPad.git
cd SyncPad
```

**2. Install dependencies**

```bash
npm install
```

**3. Setup environment variables**

Create a .env file in the root directory and add:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

**4. Run the project**

```bash
npm run dev
```
Server will start on ```http://localhost:5000```

## Socket.IO Events

| Event Name     | Direction         | Description                  |
|----------------|------------------|------------------------------|
| `connection`   | Server <-> Client | Establishes connection       |
| `chat-message` | Client -> Server  | Send chat messages           |
| `file-upload`  | Client -> Server  | Share a file                 |
| `file-update`  | Server -> Client  | Broadcast file changes       |
| `disconnect`   | Client -> Server  | Handle user disconnection    |

## Roadmap

* Add file version history

* Deploy on cloud (Render/Heroku/Vercel + Mongo Atlas)

## Contributions

* Contributions are welcome! Fork the repo and submit a PR.

## Author
```
Aditya Agnihotri
```