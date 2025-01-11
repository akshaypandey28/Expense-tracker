const express = require('express');
const cors = require('cors');
const { db } = require('./db/db.js');
const { readdirSync } = require('fs');
const path = require('path');
const fs = require('fs'); // Import fs for file system operations
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Use __dirname in CommonJS
const _dirname = __dirname;  // Use __dirname directly in CommonJS

// Set routes folder path
const routesPath = path.join(_dirname, './routes');  // Fixed path join

// Check if routes directory exists
if (fs.existsSync(routesPath)) {
    readdirSync(routesPath).map((route) => {
        app.use('/api/v1', require(path.join(routesPath, route)));
    });
} else {
    console.error('Routes folder does not exist!');
}

// Serve static files from frontend (Ensure correct path to the build folder)
app.use(express.static(path.join(_dirname, "../frontend_e/build")));

// Fallback for single-page application (SPA)
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, '../frontend_e', 'build', 'index.html'));
});

// Start the server
const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    });
};

server();
