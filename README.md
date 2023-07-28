# Talk-a-tive Chat Application

Talk-a-tive is a real-time chat application that allows users to communicate instantly with each other. The application is built using the MERN (MongoDB, Express, React, Node.js) stack and leverages the power of WebSockets for seamless and efficient bidirectional data exchange.

### Authentication Page![image](https://github.com/Aryan123-rgb/Talk-A-Tive/assets/118872531/5265bc06-7f17-4315-8f6b-0cd4a67b7cad)


### Chat Page ![image](https://github.com/Aryan123-rgb/Talk-A-Tive/assets/118872531/0dd97aff-47bc-47ad-bf00-abc84887f7c7)

### Real-Time Chat ![video](./Screencast%20from%202023-07-25%2021-29-46.gif)
## Features

- Real-time instant messaging with WebSockets.
- User-friendly interface for an enjoyable chatting experience.
- Secure user authentication using JWT (JSON Web Tokens).
- MongoDB database for efficient data storage and retrieval.
- Responsive design for seamless usage on various devices.
- Create, read, update, and delete (CRUD) functionalities for managing chat messages.
- Social sharing feature to share messages on popular social media platforms.

## Installation

1. Clone the repository:
   `git clone https://github.com/your-username/talk-a-tive.git`

2. Navigate to the project directory:
   `cd talk-a-tive`
3. Install the dependencies
   `cd frontend`
   `npm i`
   
   `cd backend`
   `npm i`
4. Start the backend
   `cd backend`
   `node index.js`
5. Start the frontend
   `cd frontend`
   `npm start`
6. The application will be available at http://localhost:3000/.

## Technologies Used

### Frontend:

- React.js
- Redux (optional, if used for state management)
- WebSocket API (for real-time communication)

### Backend:

- Node.js
- Express.js
- WebSocket library (e.g., Socket.IO)

### Database:

- MongoDB (using Mongoose)