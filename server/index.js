const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();


app.use(bodyParser.json());

app.use(cors({
	credentials: true,
}));

const server = http.createServer(app);

server.listen(PORT = 3001, () => {
	console.log(`Server is running on http://localhost:${PORT}/ `);
});


