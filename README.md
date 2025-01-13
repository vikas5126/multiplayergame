This project is a multiplayer Tic Tac Toe game built with React on the client side and Node.js with Socket.IO on the server side. The project allows two players to play Tic Tac Toe online in real-time.

### Project Structure
#### Client
The client-side code is located in the Client directory and is structured as follows:

- `package.json: Contains the dependencies and scripts for the client-side application.`
- `index.html: The main HTML file for the React application.`
- `src/: Contains the source code for the React application.`
- `App.js: The main component that manages the game state and handles the game logic.`
- `App.module.css: CSS module for styling the App component.`
- `index.js: The entry point for the React application.`
- `InputForm/: Contains the InputForm component and its CSS module.`
- `InputForm.js: A form component for entering the player's name.`
- `InputForm.module.css: CSS module for styling the InputForm component.`
- `Square/: Contains the Square component and its CSS module.`
- `Square.jsx: A component representing a single square on the Tic Tac Toe board.`
- `Square.module.css: CSS module for styling the Square component.`

#### Server
The server-side code is located in the Server directory and is structured as follows:

- `package.json: Contains the dependencies and scripts for the server-side application.`

- `server.js: The main server file that sets up the Socket.IO server and handles the game logic.`

### Key Features
#### Client-Side
- React Components: The application is built using React components, including App, InputForm, and Square.
- Real-Time Communication: Uses Socket.IO to communicate with the server and handle real-time updates.
- Game Logic: Manages the game state, checks for winners, and handles player moves.
- CSS Modules: Uses CSS modules for styling components to avoid naming conflicts.
Server-Side
- Socket.IO Server: Sets up a Socket.IO server to handle real-time communication between clients.
Player Matching: Matches players to opponents and manages game rooms.
- Game State Management: Handles player moves and updates the game state accordingly.
- Disconnection Handling: Manages player disconnections and notifies the opponent if a player leaves the match.

### How to Run
#### Client
- `Navigate to the Client directory.`
- `Install dependencies: npm install
Start the development server: npm start
Open http://localhost:3000 in your browser.`

#### Server
- `Navigate to the Server directory.`
- `Install dependencies: npm install
Start the server: npm start
The server will run on port 3000.`

### Available Scripts
#### Client
- npm start: Runs the app in development mode.
- npm test: Launches the test runner.
- npm run build: Builds the app for production.
- npm run eject: Ejects the configuration files.

#### Server
- npm start: Starts the server.

### Dependencies
#### Client
- @reduxjs/toolkit
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- react
- react-dom
- react-redux
- react-scripts
- socket.io
- socket.io-client
- sweetalert2
- web-vitals
#### Server
- socket.io
#### This project provides a simple yet functional example of a real-time multiplayer game using modern web technologies.
