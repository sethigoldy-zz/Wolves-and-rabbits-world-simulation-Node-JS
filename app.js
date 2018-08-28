const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
require('dotenv').config();

//const index = require("./routes/index");
const app = express();

const server = http.createServer(app);
const io = socketIo(server);
const common = require("./models/common");
io.on("connection", socket => {
    console.log("New client connected"), setInterval(
        () => getApiAndEmit(socket),
        1000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
});
const getApiAndEmit = async socket => {
    try {
        socket.emit("FromAPI", {
            "carrots": global.carrots.length,
            "rabbits": global.rabbits.length,
            "wolfs" : global.wolves.length,
            "grid" : global.grid,
            "notifications": global.notifications         
        });
    } catch (error) {
        console.error(error);
    }
};
server.listen(port, () => console.log(`Listening on port ${port}`));