let space = require("./space");
let carrots = require("./carrot");
let rabbits = require("./rabbit");
let wolfs = require("./wolf");

//initilize the world
(function(){
    global.notifications=[];
    if(Math.pow(process.env.TOTAL_SPACE,2) < (
        parseInt(process.env.INIT_CARROTS) 
        + parseInt(process.env.INIT_RABBITS)
        + parseInt(process.env.INIT_WOLVES)
    )){
        console.log('Not Enough Space in the world for Carrots, Wolves and Rabbits ;) .');
        process.exit();
    }
    space.initSpace(process.env.TOTAL_SPACE);
    rabbits.initRabbits();
    wolfs.initWolves();
    carrots.initCarrots();

})();

let movable =['rabbits','wolves'];
setInterval(function(){
    global.notifications=[];
    for(let i in movable){
        console.log(global[movable[i]],"global[movable[i]]");
        global[movable[i]].forEach((element,index) => {
            if(global[movable[i]][index]){                
                let posXY = space.getPositionXY(global[movable[i]][index].type,
                    global[movable[i]][index].position_x,
                    global[movable[i]][index].position_y,
                    global[movable[i]][index]);
                if(posXY){
                    global[movable[i]][index].position_x=posXY.X;
                    global[movable[i]][index].position_y=posXY.Y;
                    // console.log(`a ${movable[i]} just moved to position ${global[movable[i]][index].position_x} - ${global[movable[i]][index].position_y}`);    
                }
            }
        });
        
    }

},process.env.TIME*1000);

module.exports = {
    'rabbits':rabbits,
    'carrots':carrots,
    'wolfs':wolfs
}