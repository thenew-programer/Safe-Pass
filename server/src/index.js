import  express  from 'express';
import http from 'http';
import bodyParser  from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';
import router from './router/index.js';

const app = express();

// Connect to db
export const db = mysql.createConnection({
	user: 'jos',
	host: 'localhost',
	password: 'jos@mysqlMachine.34',
	database: 'passwordManager'
});


app.use(cors());
app.use(bodyParser.json());


const server = http.createServer(app);


server.listen(3001, () => {
	console.log(`Server is running on http://localhost:3001/`);
});


app.use('/', router());

