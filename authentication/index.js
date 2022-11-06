const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const localStrategy = require("passport-local").Strategy;
const path = require("path");
require('dotenv').config();
const User = require("./user");
const app = express();
const PORT = process.env.PORT || process.env.SERVER_PORT;
mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://GoceryAdmin:${process.env.MONGO_PASSWORD}@cluster0.cbm5e17.mongodb.net/?retryWrites=true&w=majority&ssl=true`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Mongoose is connected");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.baseURL || `http://localhost:${process.env.CLIENT_PORT}`,
    credentials: true
}));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
}));
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);
app.post("/loginBackend", (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            res.status(500).send(err.response.body);
            throw err;
        }
        if (!user) {
            res.status(404).send(false);
            console.log("User not found");
        }
        else {
            req.logIn(user, (err) => {
                if (err) {
                    res.status(500).send(err);
                    throw err;
                }
                else {
                    res.status(200).send(true);
                    console.log("Successful login");
                }
            });
        }
    })(req, res, next);
});
app.post("/registerBackend", (req, res) => {
    User.findOne({username: req.body.username}, async (err, doc) => {
        if (err) {
            res.status(500).send(err);
            res.status(500).send(err.response.body);
            throw err;
        }
        if (doc) {
            res.status(409).send(false);
            console.log("User already exists");
        }
        else if (!doc) {
            try {
                const hashed = await bcrypt.hash(req.body.password, 10);
                const newUser = new User({
                    username: req.body.username,
                    password: hashed,
                    address: req.body.address,
                    data: req.body.data
                });
                await newUser.save();
                res.status(200).send(true);
                console.log("Successful account creation");
            } catch (err) {
                res.status(500).send(err);
                res.status(500).send(err.response.body);
                throw err;
            }
        }
    })
});
app.get("/dataBackend", (req, res) => {
    try {
        if (req.user) {
            res.status(200).send(req.user);
            console.log("Successful data retrieval");
        }
        else {
            res.status(404).send(false);
            console.log("User not found");
        }
    }
    catch (err) {
        res.status(500).send(err);
        res.status(500).send(err.response.body);
        throw err;
    }
});
app.post("/logoutBackend", (req, res, next) => {
    try {
        req.logout(function(err) {
            if (err) {
                res.status(500).send(err);
                res.status(500).send(err.response.body);
                throw err;
            }
        })
        res.status(200).send(true);
        console.log("Successful logout");
    }
    catch (err) {
        res.status(500).send(err);
        res.status(500).send(err.response.body);
        throw err;
    }
});
app.post("/updateBackend", async (req, res) => {
    try {
        await User.findOneAndUpdate({username: req.user.username}, {data: req.body});
        res.status(200).send(true);
        console.log("Successful update");
    }
    catch (err) {
        res.status(500).send(err);
        res.status(500).send(err.response.body);
        throw err;
    }
});

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});