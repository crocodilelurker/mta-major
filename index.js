const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');


app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended :true}))

app.use('/api/auth', authRoutes);

const connectDb = require('./config/dbConnect.js')

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDb();

app.listen(PORT, () => {
    console.log("Server is uptime on port " + PORT);
})