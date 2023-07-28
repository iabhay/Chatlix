const mongoose = require('mongoose');
const dotenv = require("dotenv")

dotenv.config()
const url = process.env.URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=> console.log('Connected to Database')).catch((err)=> console.log('Not connected!', err));

