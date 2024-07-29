const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const json = require('express').json;
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(json());
app.use(cors());
const itemRoute = require('./Routes/item');


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log("Database Connected Succesfully");
});

mongoose.connection.on("error", (err) => {
    console.log(`Error Found ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log("DisConnected");
})

app.use("/api/items", itemRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started succesfully on Port ${port}`);
});
