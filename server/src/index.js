import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errHandler, isAuthenticated } from './middlewares/index.js';
import router from './router/index.js';
import './config.js'

const app = express();
let PORT = 0;

// Connect to db
export const db = mysql.createPool(process.env.DATABASE_URL);
mongoose.Promise = Promise;
mongoose.connect(process.env.USERS_DATABASE_URL);


const allowedOrigins = [
	'https://safe-pa.web.app',
	'http://localhost:3000',
	'https://safe-pa.firebaseapp.com'
];
const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true,
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(isAuthenticated);


const server = http.createServer(app);

server.listen(PORT = (process.env.PORT || 3001), () => {
	console.log(`Server is running on http://localhost:${PORT}/`);
});


app.use('/', router());
app.use(errHandler);
