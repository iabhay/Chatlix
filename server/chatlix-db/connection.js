const mongoose = require('mongoose');

const url = `mongodb+srv://chatlix_abhay:abhay1234@cluster0.4jdhfni.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=> console.log('Connected to Database')).catch((err)=> console.log('Not connected!', err));

