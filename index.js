const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const connectDb = require('./config/dbConnect.js')

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDb();

app.listen(PORT, () => {
    console.log("Server is uptime on port " + PORT);
})