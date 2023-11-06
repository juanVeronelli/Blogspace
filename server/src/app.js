import express from 'express';
const app = express();

import path from 'path';

//middlewares 
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // convert json

//server settings
const port = 3000;

const uploadsPath = path.resolve(process.cwd(), '../uploads');
app.use('/uploads', express.static(uploadsPath));

import cors from 'cors';
app.use(cors({
    exposedHeaders: ['x-access-token']
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// routing
import router from './routes.js'
app.use('/', router )

app.listen(port, () => {
    console.log('App escuchando en el puerto ' + port);
});