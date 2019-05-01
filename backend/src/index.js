require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const { PORT: port  } = process.env;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cors());

app.use('/', require('./api'));

server.listen(port, () => {
	console.log(`Server is listening to port ${port}`);	
});
