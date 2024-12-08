const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


const corsOptions = {
    origin: ['http://localhost:3002'], 
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use(express.json());


mongoose.connect('mongodb+srv://i222425:tiaSuczzK9bkGC1Q@cluster0.npo8a.mongodb.net/webfinalproject?retryWrites=true&w=majority', {
   
})
    .then(() => console.log('Renter Panel: Connected to MongoDB'))
    .catch((error) => console.log('Error:', error));



const PORT = 5003; 
app.listen(PORT, () => console.log(`Renter Panel server running on port ${PORT}`));
