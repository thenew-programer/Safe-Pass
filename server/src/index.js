import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';
import router from './router/index.js';
import './config.js'

const app = express();
let PORT = 0;

// Connect to db
export const db = mysql.createPool(process.env.DATABASE_URL);

db.connect((err) => {
	if (err) {
		console.error('Error connection to MYSQL db:', err);
	}
	else console.log("Connected to sql successfully");
})

app.use(cors());
app.use(bodyParser.json());


const server = http.createServer(app);


server.listen(PORT = (process.env.PORT || 3001), () => {
	console.log(`Server is running on http://localhost:${PORT}/`);
});


app.use('/', router());

