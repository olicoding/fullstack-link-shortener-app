# Link Shortener App

( click on the image bellow to watch a 1 min demo video )

[![](https://img.youtube.com/vi/gMfnlU4VX_8/0.jpg)](https://www.youtube.com/watch?v=gMfnlU4VX_8)

---

## Description

A simple webapp that allows users to create short links and track clicks. Built with the MERN stack and Tailwind. Fully functional in the development environment, where requests to the server are made over HTTP. Currently working on handling HTTPS requests for production. I am also testing implementing it with Next.js 13, exploring Server Side Rendering, hydration and other modern development concepts.

---

## Tech-stack

- MongoDB
- Express
- React
- Node.js
- Mongoose
- Axios
- Tailwind

---

## Features

- Create short links by entering a target URL
- View click statistics for each short link

## Installation and Setup

- Clone/fork this repository
- On root directory, install dependencies:
  > npm install
- Navigate to the client directory, install dependencies:
  > npm install
- Navigate to the server directory, install dependencies:
  > npm install
- Back to root, create a .env file and define the following variables:
  - DATABASE_URI: the MongoDB connection string
  - PORT: the server port number
- Start the client and server together from the root, by running:
  > npm run dev

## Usage

- The application will automatically open in your web browser once the server is started.
- Enter a target URL and click "Shorten".
- The short link and click statistics will be displayed on the page.

## Future Plans

- Implement user authentication.
- Implement a more advanced analytics dashboard.
