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
            "carrots": (function(){
                let total_number = 0;
                if(global.grid){
                    for(let i =0;i<global.grid[0].length;i++)
                {
                    let grid_carrots = global.grid[i].filter(point=>point == 1)
                    if(grid_carrots)
                    total_number += grid_carrots.length;
                }
                }
                return total_number;            
            })(),
            "rabbits": global.rabbits.length,
            "wolfs" : global.wolves.length,
            "grid" : global.grid,
            "notifications": global.notifications         
        });
        global.notifications=[];
    } catch (error) {
        console.error(error);
    }
};
server.listen(port, () => console.log(`Listening on port ${port}`));