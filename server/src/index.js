import  express  from 'express';
import http from 'http';
import bodyParser  from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import router from './router/index.js';
import config from 'dotenv';
config.config();

const app = express();

// Connect to db
export const db = mysql.createConnection({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});


app.use(cors());
app.use(bodyParser.json());


const server = http.createServer(app);


server.listen(3001, () => {
	console.log(`Server is running on http://localhost:3001/`);
});


app.use('/', router());

