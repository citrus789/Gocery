const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: String,
    password: String,
    address: String,
    data: [{
        name: String,
        pricePound: String,
        storeName: String,
        distance: String,
        address: String,
        rating: String,
        image: String
    }]
});

module.exports = mongoose.model("User", user);