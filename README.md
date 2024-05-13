# NoExpiry

A mini project to track food items' expiry dates. Created using the MERN stack

## Features

- Add Item
- View Item in Calendar and Table Form

## Technologies
[![My Skills](https://skillicons.dev/icons?i=react,vite,tailwind,nodejs,express,mongodb,vercel,html,css,js,github&theme=dark)](https://skillicons.dev)

NoExpiry is built using a stack of modern technologies, including:

### Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- **React**: Framework for building the frontend user interface.
- **Vite**: Build tooling for modern web development.
- **Material-UI (MUI)**: For additional UI components and design elements.
- **HTML5 and CSS3**: Fundamental web technologies for structuring and styling the application.
- **JavaScript**: Programming language for interactivity and functionality

### Backend

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel)
- **Node.js and Express.js**: Powering the backend server and API development.
- **MongoDB**: A NoSQL database used for storing and managing items.
- **Vercel**: Used for hosting both the frontend and backend server and ensuring reliable deployment.

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/Zaiqin/NoExpiry.git
   ```

2. Install dependencies:

   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the `server` directory.
   - Define necessary environment variables, such as database connection strings and API keys.

4. Start the backend server:

   ```bash
   cd server
   node --env-file=config.env server
   ```

5. Start the frontend development server:

   ```bash
   cd client
   npm run dev
   ```

5. Access the application in your browser

## Deployment

This project is also deployed on Vercel [here](https://no-expiry-client.vercel.app/)
