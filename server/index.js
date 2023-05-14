const express = require('express');
const http = require('http');
const cors = require('cors');
const mysql = require('mysql');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

const server = http.createServer();

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT} `);
});


