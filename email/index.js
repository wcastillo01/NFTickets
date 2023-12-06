const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const emailService= require('./sender');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const mongo_url = process.env.MONGO_URL;

mongoose
    .connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("[Connected to database]");
    })
    .catch(err => {
        console.log("[Database connection failed]:", err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/send-email', (req, res) => {
    const email = req.body.email;
    const emailData = {
        ticketTitle: req.body.ticketTitle,
        ticketQuantity: req.body.ticketQuantity,
        eventTime: req.body.eventTime,
        eventLocation: req.body.eventLocation,
    };
    emailService.sendPurchaseEmail(email, emailData);
    res.send('Email sent!');
});

app.listen(port, () => {
    console.log(`[Server running on port ${port}]`);
});

